import React from "react";

function TransactionListItem(props) {
  const { amount, date, id } = props;
  const day = new Date(date);
  const tdate = day.toLocaleString();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <tr>
      <td>{id}</td>
      <td>{formatter.format(amount / 100)}</td>
      <td>{tdate}</td>
    </tr>
  );
}

export default TransactionListItem;
