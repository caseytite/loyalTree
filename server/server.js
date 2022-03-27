require("dotenv").config();

const PORT = 3009; // Client will be 3000
const express = require("express");

// middleware
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// database
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const app = express();
// const router = express.Router()

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["chicken", "horse", "cat"],
  })
);

const cardRoutes = require("./routes/cards");
app.use("/cards", cardRoutes(db));
const dashboardRoutes = require("./routes/dashboard");
app.use("/dashboard", dashboardRoutes(db));
const storeRoutes = require("./routes/stores");
app.use("/stores", storeRoutes(db));

const {
  USER,
  USERS,
  STORES,
  ADD_USER,
  TRANSACTIONS,
  USERS_STORES, // most likely not needed
  STORE_TRANSACTIONS,
} = require("./querys");

// ---------------------USERS ----------------------
// not being used
app.get("/users", (req, res) => {
  db.query(USERS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

app.get("/user", (req, res) => {
  db.query("select * from users where users.id = $1", [req.session.id]).then(
    (data) => res.json({ user: data.rows })
  );
});

app.post("/login", (req, res) => {
  const [query, params] = USER(req.body);
  db.query(query, params)
    .then((data) => {
      const user = data.rows;
      req.session.id = user[0].id;
      res.json({
        data: data.rows,
        user: user[0],
      });
    })
    .catch((err) => res.json({ error: err.message }));
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

// not being used
app.post("/users", (req, res) => {
  const [query, params] = ADD_USER(req.body);
  db.query(query, params)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => console.log("error", err.message));
});

//------------TRANSACTIONS // none of these are being used
// ---transactions specific to a store and user

// not being used
app.get("/transactions/:store/:user", (req, res) => {
  db.query(
    `SELECT * FROM transactions
JOIN stores ON store_id = stores.id
JOIN users ON owner_id = users.id
where users.id = $2 AND store_id = $1
ORDER BY transactions.created_at ASC
`,
    [req.params.store, req.params.user]
  )
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

// not being used
app.get("/transactions", (req, res) => {
  db.query(TRANSACTIONS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

// not being used
app.get("/store/transactions", (req, res) => {
  const [query, params] = STORE_TRANSACTIONS();
  db.query(query)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

// redeem points for a gift card
app.post("/redeem/points", (req, res) => {
  let redeemingPoints;
  db.query(
    `SELECT points FROM users
            WHERE id = $1
  `,
    [req.session.id]
  )
    .then((data) => {
      const currentPoints = data.rows[0];

      redeemingPoints =
        currentPoints.points < req.body.amount
          ? currentPoints.points
          : req.body.amount;

      db.query(
        `UPDATE users
      SET points = points - $1
      WHERE users.id = $2;
      `,
        [Math.floor(redeemingPoints), req.session.id]
      );
    })
    .then((data) => {
      db.query(
        `SELECT id FROM users
        WHERE email LIKE $1`,
        [`${req.body.email}%`]
      )
        .then((data) => {
          return data.rows[0];
        })
        .then((data) => {
          db.query(
            `INSERT INTO gift_cards(user_id, balance, store_id) 
            VALUES($1, $2, $3 ) RETURNING *;`,
            [data.id, Math.floor(redeemingPoints * 10), req.body.store_id]
          )
            .then((data) =>
              db.query(
                `
              INSERT INTO transactions(giftcard_id,store_id, amount)
              VALUES($1, $2, $3) RETURNING *;`,
                [data.rows[0].id, data.rows[0].store_id, data.rows[0].balance]
              )
            )
            .then((data) => res.json({ data: data.rows }))
            .catch((err) => console.log("error", err.message));
        });
    });
});

// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
