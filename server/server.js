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

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['id'],
//   })
// )

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
    .then(data => res.json({ data: data.rows }))
    .catch(err => res.json({ error: err.message }));
});

app.get('/login', (req, res) => {
  const [query, params] = USER(req.query);
  db.query(query, params)
    .then(data => {
      const user = data.rows;
      // if we want session cookies uncomment below lines
      // req.session.id = user[0].id
      // sessionId: req.session.id,
      res.json({
        data: data.rows,
        user: user[0],
      });
    })
    .catch(err => res.json({ error: err.message }));
});

app.post('/users', (req, res) => {
  const [query, params] = ADD_USER(req.body);
  db.query(query, params)
    .then(data => res.json({ data: data.rows }))
    .catch(err => console.log('error', err.message));
});

/////logout Get///

///////////////
// -STORES   //
///////////////
app.get('/stores', (req, res) => {
  db.query(STORES)
    .then(data => res.json({ data: data.rows }))
    .catch(err => res.json({ error: err.message }));
});

app.get('/stores/:id', (req, res) => {
  db.query(
    `SELECT * FROM stores
     WHERE id = $1;`,
    [req.params.id]
  )

    .then(data => res.json({ data: data.rows }))
    .catch(err => res.json({ error: err.message }));
});

///////////////
//--CARDS----//
//////////////
// -----all cards
app.get('/cards', (req, res) => {
  db.query(GIFT_CARDS)
    .then(data => res.json({ data: data.rows }))
    .catch(err => res.json({ error: err.message }));
});

//------cards by user id
app.get('/cards/:id', (req, res) => {
  console.log(req.params)
  db.query(
    `SELECT * FROM users
JOIN gift_cards ON user_id = users.id
WHERE gift_cards.user_id = $1`,
    [req.params.id]
  )
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

//----cards post by id
app.post('/cards/:id', (req, res) => {
  // if buying for self
  let user = req.body
  console.log(user)
  if (user.email === 'undefined') {
    console.log('here')
    db.query(
      `INSERT INTO gift_cards(user_id, balance, store_id) 
    VALUES($1, $2, $3 ) RETURNING *;`,
      [
        req.body.user_id,
        req.body.balance,
        req.body.store_id,
      ]
    )
      .then((data) => res.json({ data: data.rows }))
      .catch((err) => console.log('error', err.message))
  } else if (user.email) {
    // console.log(user.email);
    db.query(
      `SELECT id FROM users
  WHERE email LIKE $1`,
      [`${user.email}%`]
    )
      .then((data) => {
        // console.log(data.rows)
        return data.rows[0];
      })
      .then((data) => {
        db.query(
          `INSERT INTO gift_cards(user_id, balance, store_id) 
        VALUES($1, $2, $3 ) RETURNING *;`,
          [data.id, req.body.balance, req.body.store_id]
        )
          .then((data) => res.json({ data: data.rows }))
          .catch((err) => console.log('error', err.message))
      })
  }
})

app.get('/checkout', (req, res) => {
  db.query(``)
})

////////////////
// Dashboard //
///////////////
////add return store_id
//------------TRANSACTIONS
// ---transactions specific to a store and user
app.get('/transactions/:store/:user', (req, res) => {
  db.query(`SELECT * FROM transactions
JOIN stores ON store_id = stores.id
JOIN users ON owner_id = users.id
where users.id = $2 AND store_id = $1
ORDER BY transactions.created_at ASC
`, [req.params.store, req.params.user])
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})



// app.get('/transactions/:store/:user', (req, res) => {

//   // console.log(req)
//   console.log(req.params)
//   console.log(req.query)
//   db.query(
//     `SELECT transactions.created_at FROM transactions

// `,
//     [req.params.store, req.params.user]
//   )
//     .then((data) => res.json({ data: data.rows }))
//     .catch((err) => res.json({ error: err.message }))
// })

app.get('/transactions', (req, res) => {
  console.log("poopy pants");
  db.query(TRANSACTIONS)
    .then(data => res.json({ data: data.rows }))
    .catch(err => res.json({ error: err.message }));
});

app.get('/store/transactions', (req, res) => {
  const [query, params] = STORE_TRANSACTIONS();
  db.query(query)
    .then(data => res.json({ data: data.rows }))
    .catch(err => res.json({ error: err.message }));
});

// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
})


