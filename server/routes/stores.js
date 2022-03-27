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

  router.post("/:id/redeem/", (req, res) => {
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

  return router;
};
