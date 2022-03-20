require('dotenv').config()

const PORT = 3009 // Client will be 3000
const express = require('express')

// middleware
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

// database
const { Pool } = require('pg')
const dbParams = require('./lib/db.js')
const db = new Pool(dbParams)
db.connect()

const app = express()
const router = express.Router()

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cookieSession({
    name: 'session',
    keys: ['id'],
  })
)

const {
  USER,
  USERS,
  STORES,
  ADD_USER,
  GIFT_CARDS,
  STORE_TYPE,
  TRANSACTIONS,
  USERS_STORES,
  USERS_GIFT_CARDS,
  STORE_TRANSACTIONS,
  GIFT_CARDS_BY_STORE,
} = require('./querys')
const { query } = require('express')

// ---------------------USERS ----------------------
app.get('/users', (req, res) => {
  db.query(USERS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

app.get('/login', (req, res) => {
  const [query, params] = USER(req.query)
  db.query(query, params)
    .then((data) => {
      const user = data.rows
      req.session.id = user[0].id
      res.json({
        data: data.rows,
        sessionId: req.session.id,
      })
    })
    .catch((err) => res.json({ error: err.message }))
})

app.post('/users', (req, res) => {
  const [query, params] = ADD_USER(req.body)
  db.query(query, params)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => console.log('error', err.message))
})

/////logout Get///
app.get('/', (req, res) => {


})

// ------------------------STORES

app.get('/stores', (req, res) => {
  db.query(STORES)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

app.get('/stores/:id', (req, res) => {
  db.query(`SELECT * FROM stores
  JOIN users ON owner_id = users.id
   WHERE stores.owner_id = $1;`, [req.params.id])

    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})


//--------------------CARDS-----------------

app.get('/cards', (req, res) => {
  db.query(GIFT_CARDS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

app.get('/user/giftcards', (req, res) => {
  const [query, params] = USERS_GIFT_CARDS()
  db.query(query)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

app.get('/stores/giftcards', (req, res) => {
  const [query, params] = GIFT_CARDS_BY_STORE()
  db.query(query)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

//------------TRANSACTIONS

app.get('/transactions', (req, res) => {
  db.query(TRANSACTIONS)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

app.get('/store/transactions', (req, res) => {
  const [query, params] = STORE_TRANSACTIONS()
  db.query(query)
    .then((data) => res.json({ data: data.rows }))
    .catch((err) => res.json({ error: err.message }))
})

// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
})
