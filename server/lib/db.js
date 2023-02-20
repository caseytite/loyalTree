let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  };
}

module.exports = dbParams;