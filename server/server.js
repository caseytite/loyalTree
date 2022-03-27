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
//web socket--------------------------------

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("socket id:", socket.id);

  socket.on("disconnect", () => {
    console.log("closed");
  });
});

//---------------------------------------
const {
  USER,
  USERS,
  STORES,
  ADD_USER,
  TRANSACTIONS,
  USERS_STORES, // most likely not needed
  STORE_TRANSACTIONS,
} = require("./querys");
// const { query } = require('express')

// ---------------------USERS ----------------------

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

// ----- transactions on a specific card
app.get("/cards/:id/transactions", (req, res) => {
  db.query(
    `
    SELECT * FROM transactions
    WHERE giftcard_id = $1
    ORDER BY created_at DESC;
  `,
    [req.params.id]
  ).then((data) => res.json(data.rows));
});

// -----a specific card
// cards/id/topup
app.put("/cards/:id/topup", (req, res) => {
  db.query(
    `
    UPDATE gift_cards 
    SET(balance, edited_at) = (balance + $1, now())
    WHERE id = $2 RETURNING *;
  `,
    [req.body.amount * 100, req.params.id]
  )
    .then((data) => {
      db.query(
        `UPDATE users
      SET points = points + $1
      WHERE users.id = $2;
      `,
        [Math.floor(req.body.amount / 10), req.session.id]
      );
      return db.query(
        `
  INSERT INTO transactions(giftcard_id,store_id, amount,receiver_id)
  VALUES($1, $2, $3,$4) RETURNING *;`,
        [
          data.rows[0].id,
          data.rows[0].store_id,
          req.body.amount * 100,
          req.session.id,
        ]
      );
    })
    .then((data) => {
      res.json({ data: data.rows });
    });
});

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
  const amount = req.body.amount * 100; // needs to be sent from front
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
        [sendingAmount, req.params.id]
      );
      console.log("originCard", originCard);
      return (receivingCard = {
        sendingCardID: originCard.id, // piggybacking data entry
        store_id: originCard.store_id,
        balance: sendingAmount,
      });
    })
    .then((receivingCard) => {
      // here we will commit the receiving card to DB
      console.log("second", receivingCard);
      db.query(
        `
        INSERT INTO gift_cards (user_id, balance, store_id )
        VALUES ((SELECT users.id from users WHERE email = $1), $3, $2) RETURNING *;
        `,
        [req.body.email, receivingCard.store_id, receivingCard.balance]
      )
        .then((data) => {
          return (transactionInfo = {
            sendingCardID: receivingCard.sendingCardID,
            store_id: receivingCard.store_id,
            amount: receivingCard.balance,
            newCardID: data.rows[0].id,
          });
        })
        .then((transactionInfo) => {
          //create a debiting and crediting transaction
          db.query(
            `
            INSERT INTO transactions(giftcard_id, amount)
            VALUES($1, $2)`,
            [transactionInfo.sendingCardID, transactionInfo.amount * -1]
          );
          db.query(
            `
            INSERT INTO transactions(giftcard_id, amount)
             VALUES($1, $2)`,
            [transactionInfo.newCardID, transactionInfo.amount]
          );
        });
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
  // if buying for self;
  let user = req.body;
  if (user.email === "") {
    db.query(
      `INSERT INTO gift_cards(user_id, balance, store_id) 
    VALUES($1, $2, $3 ) RETURNING *;`,
      [req.body.user_id, req.body.amount * 100, req.body.store_id]
    )
      .then((data) => {
        db.query(
          `UPDATE users
        SET points = points + $1
        WHERE users.id = $2;
        `,
          [Math.floor(req.body.amount / 10), req.session.id]
        );
        return db.query(
          `
      INSERT INTO transactions(giftcard_id,store_id, amount)
      VALUES($1, $2, $3) RETURNING *;`,
          [data.rows[0].id, data.rows[0].store_id, data.rows[0].balance]
        );
      })
      .then((data) => res.json(data.rows))
      .catch((err) => console.log("error", err.message));
  } else if (user.email) {
    db.query(
      `UPDATE users
    SET points = points + $1
    WHERE users.id = $2;
    `,
      [Math.floor(req.body.amount / 10), req.session.id]
    );

    db.query(
      `SELECT id FROM users
  WHERE email LIKE $1`,
      [`${user.email}%`]
    )
      .then((data) => {
        return data.rows[0];
      })
      .then((data) => {
        db.query(
          `INSERT INTO gift_cards(user_id, balance, store_id) 
        VALUES($1, $2, $3 ) RETURNING *;`,
          [data.id, req.body.amount * 100, req.body.store_id]
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
      req.session.store_id = data.rows[0].store_id;
      console.log(data.rows[0]);
      res.json(data.rows[0]);
    })
    .catch((err) => res.json({ error: err.message }));
});

// check that scanned card is valid and get balance
app.get("/dashboard/redeem", (req, res) => {
  const cardID = +req.query.cardID;
  const storeID = req.session.store_id;
  console.log({ card: cardID, store: storeID });

  db.query(
    `
    SELECT id, balance, store_id FROM gift_cards
    WHERE id = $1
    AND store_id = $2
  `,
    [cardID, storeID]
  )
    .then((data) => {
      const results = data.rows[0];
      // check if balance is missing
      console.log(data.rows[0]);
      return results.balance ? res.json(data.rows[0]) : undefined;
    })
    .catch((err) => {
      res.json({ error: "Card not valid" });
    });
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
// redeem amount from gift card
app.post("/dashboard/redeem", (req, res) => {
  const cardID = req.body.cardID;
  const storeID = req.session.store_id;
  const transAmt = Math.round(req.body.transAmt * 100);
  const cardAmt = req.body.cardAmt;
  const debitAmt = transAmt > cardAmt ? cardAmt : transAmt;

  // remove balance from card
  console.log("attempting to remove balance from card");
  db.query(
    `
    UPDATE gift_cards
    SET balance = balance - $1
    WHERE id = $2
    returning *
  `,
    [debitAmt, cardID]
  )
    .then((data) => {
      // create transaction record
      console.log("first data =", data.rows[0]);
      console.log("attempting to create record");
      return db.query(
        `
      INSERT INTO transactions (
        giftcard_id, store_id, amount )
      VALUES (
        $1, $2, $3 )
      RETURNING *
        `,
        [cardID, storeID, debitAmt * -1]
      );
    })
    .then((data) => {
      // return transaction record
      console.log("second data =", data.rows[0]);
      return res.json(data.rows[0]);
    });
});

//get transactions for store by owner
app.get("/dashboard/transactions", (req, res) => {
  console.log(req);
  db.query(
    `
    SELECT *, transactions.id FROM transactions
    WHERE store_id = $1
    ORDER BY transactions.created_at DESC
    `,
    [req.session.id]
  ).then((data) => res.json({ data: data.rows }));
});

// to run use npx nodemon
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}!`);
// });

server.listen(PORT, () => {
  console.log(`HTTP Server Running on PORT: ${PORT}`);
});
