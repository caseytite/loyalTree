require('dotenv').config();

const PORT = 3009; // Client will be 3000
const express = require('express');

// middleware
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// database
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const app = express();
// const router = express.Router()

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['chicken', 'horse', 'cat'],
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
} = require('./querys');
// const { query } = require('express')

// ---------------------USERS ----------------------
app.get('/users', (req, res) => {
  db.query(USERS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

app.post('/login', (req, res) => {
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

app.post('/users', (req, res) => {
  const [query, params] = ADD_USER(req.body);
  db.query(query, params)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => console.log('error', err.message));
});

/////logout Get///

///////////////
// -STORES   //
///////////////
app.get('/stores', (req, res) => {
  db.query(STORES)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

app.get('/stores/:id', (req, res) => {
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
// -----all cards
app.get('/card/:id', (req, res) => {
  console.log(req.body);
  db.query(
    `SELECT *  FROM gift_cards
WHERE gift_cards.id = $1`,
    [req.params.id]
  ).then((data) => res.json({ data: data.rows }));
});

app.get('/cards', (req, res) => {
  const [query, params] = USERS_GIFT_CARDS(req.session.id);
  db.query(query, params)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

//------cards by user id
app.get('/cards/:id', (req, res) => {
  console.log(req.params);
  db.query(
    `SELECT *, gift_cards.id as gift_card_id FROM users
JOIN gift_cards ON user_id = users.id
JOIN stores ON users.id = user_id
WHERE gift_cards.user_id = $1`,
    [req.params.id]
  )
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

//----cards post by user id, creates new transaction record
app.post('/cards/:id', (req, res) => {
  // if buying for self
  let user = req.body;
  if (user.email === '') {
    db.query(
      `INSERT INTO gift_cards(user_id, balance, store_id) 
    VALUES($1, $2, $3 ) RETURNING *;`,
      [req.body.user_id, req.body.balance, req.body.store_id]
    )
      .then((data) =>
        db.query(
          `
      INSERT INTO transactions(giftcard_id,store_id, amount)
      VALUES($1, $2, $3) RETURNING *;`,
          [data.rows[0].id, data.rows[0].store_id, data.rows[0].balance]
        )
      )
      .then((data) => res.json(data.rows))
      .catch((err) => console.log('error', err.message));
  } else if (user.email) {
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
          .catch((err) => console.log('error', err.message));
      });
  }
});

// PUT request  add balance Cards  by user id
app.put('/cards/:id', (req, res) => {
  db.query(
    `UPDATE gift_cards 
    SET BALANCE = BALANCE + $1
    WHERE id = $2 RETURNING *;`,
    [req.body.balance, req.params.id]
  )
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => console.log('error', err.message));
});

//PUT request transfer balance from own gift card to another user by email

////////////////
// Dashboard //
///////////////
//------------TRANSACTIONS
// ---transactions specific to a store and user
app.get('/transactions/:store/:user', (req, res) => {
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

app.get('/transactions', (req, res) => {
  db.query(TRANSACTIONS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

app.get('/store/transactions', (req, res) => {
  const [query, params] = STORE_TRANSACTIONS();
  db.query(query)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }));
});

// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
