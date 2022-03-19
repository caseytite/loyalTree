require("dotenv").config();


const PORT = 3009 // Client will be 3000
const express = require('express')

// middleware
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

// database
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const app = express()
const router = express.Router()

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));



const {
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
  USERS_LOYALTY_CARDS,
} = require('./querys');
const { query } = require("express");

const data = [
  {first_name: 'Casey', last_name: 'T', email: 'casey@123.com', },
  {first_name: 'Chris', last_name: 'B ', email: 'Chris@123.com', },
  {first_name: 'Logan', last_name: 'W', email: 'logan@123.com', }
]

app.get('/test', (req,res) => {
  res.json({test: data})
})


// ---------------------USERS ----------------------
app.get('/users', (req,res) => {
 db.query(USERS)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

app.post('/users', (req,res) => {
  const [query,params] = ADD_USER(req.body)
 db.query(query,params)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => console.log('error', err.message))
})



//----------------------LOYALTY CARDS
app.get('/loyaltycards', (req,res) => {
  const [query,params] = USERS_LOYALTY_CARDS()
 db.query(query)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})


// ------------------------STORES
app.get('/stores', (req,res) => {
 db.query(STORES)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

app.get('/stores/type', (req,res) => {
  const [query,params] = STORE_TYPE()
 db.query(query)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

app.get('/user/stores', (req,res) => {
  const [query,params] = USERS_STORES()
 db.query(query)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})


//--------------------GIFT CARDS-----------------

app.get('/giftcards', (req,res) => {
 db.query(GIFT_CARDS)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

app.get('/user/giftcards', (req,res) => {
  const [query,params] = USERS_GIFT_CARDS()
 db.query(query)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

app.get('/stores/giftcards', (req,res) => {
  const [query,params] = GIFT_CARDS_BY_STORE()
 db.query(query)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

//------------TRANSACTIONS


app.get('/transactions', (req,res) => {
 db.query(TRANSACTIONS)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})

app.get('/store/transactions', (req,res) => {
  const [query,params] = STORE_TRANSACTIONS()
  db.query(query)
    .then((data) => res.json({data:data.rows}))
    .catch((err) => res.json({error:err.message}))
})


// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
})
