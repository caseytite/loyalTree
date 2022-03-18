const PORT = 3001 // Client will be 3000
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

app.use(morgan('dev'))
app.use(cors())

const data = [
  {first_name: 'Casey', last_name: 'T', email: 'casey@123.com', },
  {first_name: 'Chris', last_name: 'B ', email: 'Chris@123.com', },
  {first_name: 'Logan', last_name: 'W', email: 'logan@123.com', }
]

app.get('/test', (req,res) => {
  res.json({test: data})
})

// to run use npx nodemon
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
})