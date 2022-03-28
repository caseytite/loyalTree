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

const cardRoutes = require("./routes/cards");
app.use("/cards", cardRoutes(db));
const dashboardRoutes = require("./routes/dashboard");
app.use("/dashboard", dashboardRoutes(db));
const storeRoutes = require("./routes/stores");
app.use("/stores", storeRoutes(db));

const { USER } = require("./querys");

// ---------------------USERS ----------------------

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

// to run use npx nodemon
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}!`);
// });

server.listen(PORT, () => {
  console.log(`HTTP Server Running on PORT: ${PORT}`);
});
