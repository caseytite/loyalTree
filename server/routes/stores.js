const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query("SELECT * FROM stores")
      .then((data) => res.json({ data: data.rows }))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/:id", (req, res) => {
    db.query(
      `SELECT * FROM stores
       WHERE id = $1;`,
      [req.params.id]
    )

      .then((data) => res.json({ data: data.rows }))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
