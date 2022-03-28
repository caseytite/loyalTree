const express = require("express");
const router = express.Router();

const { USERS_STORES } = require("../querys");

module.exports = (db) => {
  // store owner's dashboard for making transactions, check that user is valid
  router.get("/", (req, res) => {
    const [query, params] = USERS_STORES(req.session.id);
    db.query(query, params)
      .then((data) => {
        req.session.store_id = data.rows[0].store_id;
        res.json(data.rows[0]);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // check that scanned card is valid and get balance
  router.get("/redeem", (req, res) => {
    const cardID = +req.query.cardID;
    const storeID = req.session.store_id;

    db.query(
      `
    SELECT id, balance, store_id FROM gift_cards
    WHERE id = $1
    AND store_id = $2
  `,
      [cardID, storeID]
    )
      .then((data) => {
        const results = data.rows[0];
        // check if balance is missing
        return results.balance ? res.json(data.rows[0]) : undefined;
      })
      .catch((err) => {
        res.json({
          error: "This card is not valid. Make sure to use the correct card.",
        });
      });
  });

  // redeem amount from gift card
  router.post("/redeem", (req, res) => {
    const cardID = req.body.cardID;
    const storeID = req.session.store_id;
    const transAmt = Math.round(req.body.transAmt * 100);
    const cardAmt = req.body.cardAmt;
    const debitAmt = transAmt > cardAmt ? cardAmt : transAmt;

    // remove balance from card
    console.log("attempting to remove balance from card");
    db.query(
      `
    UPDATE gift_cards
    SET balance = balance - $1
    WHERE id = $2
    returning *
  `,
      [debitAmt, cardID]
    )
      .then((data) => {
        // create transaction record
        console.log("attempting to create record");
        return db.query(
          `
      INSERT INTO transactions (
        giftcard_id, store_id, amount )
      VALUES (
        $1, $2, $3 )
      RETURNING *
        `,
          [cardID, storeID, debitAmt * -1]
        );
      })
      .then((data) => {
        // return transaction record
        return res.json(data.rows[0]);
      });
  });

  //get transactions for store by owner
  router.get("/transactions", (req, res) => {
    db.query(
      `
    SELECT *, transactions.id FROM transactions
    WHERE store_id = $1
    ORDER BY transactions.created_at DESC
    `,
      [req.session.id]
    ).then((data) => res.json({ data: data.rows }));
  });

  return router;
};
