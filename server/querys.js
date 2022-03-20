// -----------USERS--------------------
const USERS = 'SELECT * FROM users'

const USER = (params) => {
  return [
    `SELECT * FROM users
  WHERE email LIKE $1
  AND password LIKE $2;`,
    [`${params.email}%`, `${params.password}%`],
  ]
}

const ADD_USER = (params) => {
  return [
    `INSERT INTO users (first_name,last_name,password,email,isStoreOwner,city)
  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
    [
      params.first_name,
      params.last_name,
      params.password,
      params.email,
      params.isStoreOwner,
      params.city,
    ],
  ]
}



//----------SEARCH BY STORES-----------------------
const STORES = 'SELECT * FROM stores'

const STORE_TYPE = (params) => {
  // [`%${params.category.toLowerCase().slice(1)}%`]
  return [
    `SELECT * FROM stores
  WHERE category LIKE 'Restaurant'`,
    [],
  ]
}


const STORE_DETAIL = (params) => {
  // [`%${params.category.toLowerCase().slice(1)}%`]
  console.log('params in query', params)
  return [
    `SELECT * FROM stores
  WHERE name LIKE $1`,
    [`${params.name}%`],
  ]
}

const USERS_STORES = (params) => {
  // users stores is gonna have to be req.sessions.users.id
  // params.owner_id
  return [
    `SELECT * FROM stores
  JOIN users ON owner_id = users.id
   WHERE stores.owner_id = 1;`,
    [],
  ]
}

//---------------GIFT CARDS --------------------------
const GIFT_CARDS = `SELECT * FROM gift_cards;`

const USERS_GIFT_CARDS = (params) => {
  // params.id
  return [
    `SELECT * FROM gift_cards
  JOIN users ON user_id = users.id
  JOIN stores ON gift_cards.id = stores.id
  WHERE gift_cards.user_id = 1;`,
    [],
  ]
}

const GIFT_CARDS_BY_STORE = (params) => {
  return [
    `SELECT * FROM gift_cards
  JOIN stores ON gift_cards.store_id = stores.id
 WHERE stores.category LIKE 'Retail';`,
    [],
  ]
}

//---------TRANSACTIONS---------------------------------

const TRANSACTIONS = `SELECT * FROM transactions;`

const STORE_TRANSACTIONS = (params) => {
  return [
    `SELECT * FROM transactions
  JOIN stores ON transactions.store_id = stores.id
  WHERE stores.id = 1;
  `,
    [],
  ]
}

module.exports = {
  USER,
  USERS,
  ADD_USER,
  USERS_STORES,
  USERS_GIFT_CARDS,
  STORES,
  STORE_TYPE,
  GIFT_CARDS,
  GIFT_CARDS_BY_STORE,
  TRANSACTIONS,
  STORE_TRANSACTIONS,
}
