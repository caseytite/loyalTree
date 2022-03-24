import React from "react";

function TransactionListItem(props) {
  const { amount, date, storeId, id } = props;
  // console.log(date.getUTCFullYear());
  const day = new Date(date);
  const tdate = day.toLocaleDateString();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <tbody>
      <tr>
        <td>{id}</td>
        <td>{formatter.format(amount / 100)}</td>
        <td>{tdate}</td>
      </tr>
    </tbody>
  );
}

export default TransactionListItem;
