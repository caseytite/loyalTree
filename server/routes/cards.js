const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id/transactions", (req, res) => {
    db.query(
      `
      SELECT * FROM transactions
      WHERE giftcard_id = $1
      ORDER BY created_at DESC;
    `,
      [req.params.id]
    ).then((data) => res.json(data.rows));
  });

  // -----a specific card
  // cards/id/topup
  router.put("/:id/topup", (req, res) => {
    db.query(
      `
      UPDATE gift_cards 
      SET(balance, edited_at) = (balance + $1, now())
      WHERE id = $2 RETURNING *;
    `,
      [req.body.amount * 100, req.params.id]
    )
      .then((data) => {
        db.query(
          `UPDATE users
        SET points = points + $1
        WHERE users.id = $2;
        `,
          [Math.floor(req.body.amount / 10), req.session.id]
        );
        return db.query(
          `
    INSERT INTO transactions(giftcard_id,store_id, amount,receiver_id)
    VALUES($1, $2, $3,$4) RETURNING *;`,
          [
            data.rows[0].id,
            data.rows[0].store_id,
            req.body.amount * 100,
            req.session.id,
          ]
        );
      })
      .then((data) => {
        res.json({ data: data.rows });
      });
  });

  router.get("/:id", (req, res) => {
    db.query(
      `SELECT *, gift_cards.id as gift_card_id FROM users
  JOIN gift_cards ON user_id = users.id
  JOIN stores on stores.id = store_id
  WHERE gift_cards.id = $1`,
      [req.params.id]
    ).then((data) => res.json({ data: data.rows }));
  });

  // Balance transfer to another user from our specified (/:id) card
  router.put("/:id", (req, res) => {
    const amount = req.body.amount * 100; // needs to be sent from front
    db.query(
      `SELECT * FROM gift_cards
              WHERE id = $1
      
    `,
      [req.params.id]
    )
      .then((data) => {
        res.json(data.rows[0]);

        const originCard = data.rows[0];
        const sendingAmount =
          originCard.balance < amount ? originCard.balance : amount;
        originCard.balance -= sendingAmount;

        db.query(
          `
          UPDATE gift_cards 
          SET(balance, edited_at) = (balance - $1, now())
          WHERE id = $2
        `,
          [sendingAmount, req.params.id]
        );
        return (receivingCard = {
          sendingCardID: originCard.id, // piggybacking data entry
          store_id: originCard.store_id,
          balance: sendingAmount,
        });
      })
      .then((receivingCard) => {
        // here we will commit the receiving card to DB
        db.query(
          `
          INSERT INTO gift_cards (user_id, balance, store_id )
          VALUES ((SELECT users.id from users WHERE email = $1), $3, $2) RETURNING *;
          `,
          [req.body.email, receivingCard.store_id, receivingCard.balance]
        )
          .then((data) => {
            return (transactionInfo = {
              sendingCardID: receivingCard.sendingCardID,
              store_id: receivingCard.store_id,
              amount: receivingCard.balance,
              newCardID: data.rows[0].id,
            });
          })
          .then((transactionInfo) => {
            //create a debiting and crediting transaction
            db.query(
              `
              INSERT INTO transactions(giftcard_id, amount)
              VALUES($1, $2)`,
              [transactionInfo.sendingCardID, transactionInfo.amount * -1]
            );
            db.query(
              `
              INSERT INTO transactions(giftcard_id, amount)
               VALUES($1, $2)`,
              [transactionInfo.newCardID, transactionInfo.amount]
            );
          });
      });
  });

  //------cards by user id from cookie
  router.get("/", (req, res) => {
    db.query(
      `SELECT *, gift_cards.id as gift_card_id FROM users
  JOIN gift_cards ON user_id = users.id
  JOIN stores on stores.id = store_id
  WHERE gift_cards.user_id = $1`,
      [req.session.id]
    )
      .then((data) => res.json({ data: data.rows }))
      .catch((err) => res.json({ error: err.message }));
  });

  //----cards post by user id, creates new transaction record
  // params not actually being used.  It's being done automagically
  router.post("/:id", (req, res) => {
    // if buying for self;
    let user = req.body;
    if (user.email === "") {
      db.query(
        `INSERT INTO gift_cards(user_id, balance, store_id) 
      VALUES($1, $2, $3 ) RETURNING *;`,
        [req.session.id, req.body.amount * 100, req.params.id]
      )
        .then((data) => {
          db.query(
            `UPDATE users
          SET points = points + $1
          WHERE users.id = $2;
          `,
            [Math.floor(req.body.amount / 10), req.session.id]
          );
          return db.query(
            `
        INSERT INTO transactions(giftcard_id,store_id, amount)
        VALUES($1, $2, $3) RETURNING *;`,
            [data.rows[0].id, data.rows[0].store_id, data.rows[0].balance]
          );
        })
        .then((data) => res.json(data.rows))
        .catch((err) => console.log("error", err.message));
    } else if (user.email) {
      db.query(
        `UPDATE users
      SET points = points + $1
      WHERE users.id = $2;
      `,
        [Math.floor(req.body.amount / 10), req.session.id]
      );

      db.query(
        `SELECT id FROM users
    WHERE email LIKE $1`,
        [`${user.email}%`]
      )
        .then((data) => {
          return data.rows[0];
        })
        .then((data) => {
          db.query(
            `INSERT INTO gift_cards(user_id, balance, store_id) 
          VALUES($1, $2, $3 ) RETURNING *;`,
            [data.id, req.body.amount * 100, req.params.id]
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
    }
  });

  return router;
};
