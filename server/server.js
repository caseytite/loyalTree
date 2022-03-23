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

const {
  USER,
  USERS,
  STORES,
  ADD_USER,
  GIFT_CARDS,
  STORE_DETAIL,
  TRANSACTIONS,
  USERS_STORES, // most likely not needed
  USERS_GIFT_CARDS,
  STORE_TRANSACTIONS,
  GIFT_CARDS_BY_STORE,
} = require("./querys");
// const { query } = require('express')

// ---------------------USERS ----------------------
app.get("/users", (req, res) => {
  db.query(USERS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
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

app.post("/users", (req, res) => {
  const [query, params] = ADD_USER(req.body);
  db.query(query, params)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => console.log("error", err.message));
});

/////logout Get///

///////////////
// -STORES   //
///////////////
app.get("/stores", (req, res) => {
  db.query(STORES)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

app.get("/stores/:id", (req, res) => {
  db.query(
    `SELECT * FROM stores
     WHERE id = $1;`,
    [req.params.id]
  )

    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

///////////////
//--CARDS----//
//////////////
// -----a specific card
app.get("/cards/:id", (req, res) => {
  db.query(
    `SELECT *, gift_cards.id as gift_card_id FROM users
JOIN gift_cards ON user_id = users.id
JOIN stores on stores.id = store_id
WHERE gift_cards.id = $1`,
    [req.params.id]
  ).then((data) => res.json({ data: data.rows }));
});

// Balance transfer to another user from our specified (/:id) card
app.put("/cards/:id", (req, res) => {
  const amount = req.body.amount; // needs to be sent from

  db.query(
    `SELECT * FROM gift_cards
            WHERE id = $1
    
  `,
    [req.params.id]
  )
    .then((data) => {
      res.json(data.rows[0]);

      const originCard = data.rows[0];
      const sendingAmount =
        originCard.balance < amount ? originCard.balance : amount;
      originCard.balance -= sendingAmount;

      db.query(
        `
        UPDATE gift_cards 
        SET(balance, edited_at) = (balance - $1, now())
        WHERE id = $2
      `,
        [originCard.balance, req.session.id]
      );

      return (receivingCard = {
        sendingCardID: originCard.id, // piggybacking data entry
        store_id: originCard.store_id,
        balance: sendingAmount,
      });
    })
    .then((receivingCard) => {
      // here we will commit the receiving card to DB
      db.query(
        `
        INSERT INTO gift_cards (user_id, balance, store_id )
        VALUES ((SELECT users.id from users WHERE email = $1), $3, $2)
        `,
        [req.body.email, receivingCard.store_id, receivingCard.balance]
      );
    });
});

//------cards by user id from cookie
app.get("/cards", (req, res) => {
  db.query(
    `SELECT *, gift_cards.id as gift_card_id FROM users
JOIN gift_cards ON user_id = users.id
JOIN stores on stores.id = store_id
WHERE gift_cards.user_id = $1`,
    [req.session.id]
  )
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

//----cards post by user id, creates new transaction record
app.post("/cards/:id", (req, res) => {
  // if buying for self
  console.log("bought a card", req.body);
  let user = req.body;
  if (user.email === "") {
    console.log("one");
    db.query(
      `INSERT INTO gift_cards(user_id, balance, store_id) 
    VALUES($1, $2, $3 ) RETURNING *;`,
      [req.body.user_id, req.body.balance, req.body.store_id]
    )
      .then(
        (data) => console.log("two"),
        db.query(
          `
      INSERT INTO transactions(giftcard_id,store_id, amount)
      VALUES($1, $2, $3) RETURNING *;`,
          [data.rows[0].id, data.rows[0].store_id, data.rows[0].balance]
        )
      )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log("error", err.message));
  } else if (user.email) {
    console.log("3");
    db.query(
      `SELECT id FROM users
  WHERE email LIKE $1`,
      [`${user.email}%`]
    )
      .then((data) => {
        return data.rows[0];
      })
      .then((data) => {
        console.log("4");
        db.query(
          `INSERT INTO gift_cards(user_id, balance, store_id) 
        VALUES($1, $2, $3 ) RETURNING *;`,
          [data.id, req.body.balance * 100, req.body.store_id]
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
  }
});

////////////////
// Dashboard //
///////////////
//------------TRANSACTIONS
// ---transactions specific to a store and user
// not dashboard/transactions/:userID ?
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

app.get("/transactions", (req, res) => {
  db.query(TRANSACTIONS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

app.get("/store/transactions", (req, res) => {
  const [query, params] = STORE_TRANSACTIONS();
  db.query(query)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

// store owner's dashboard for making transactions, check that user is valid
app.get("/dashboard", (req, res) => {
  const [query, params] = USERS_STORES(req.session.id);
  db.query(query, params)
    .then((data) => {
      req.session.store_id = data.rows[0].id;
      console.log(data.rows[0]);
      res.json(data.rows[0]);
    })
    .catch((err) => res.json({ error: err.message }));
});

// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
