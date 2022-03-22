import React from 'react';

function TransactionListItem(props) {
  const { amount, date, storeId } = props;
  // console.log(date.getUTCFullYear());
  const day = new Date(date);
  const tdate = day.toLocaleDateString();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Store Id</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatter.format(amount / 100)}</td>
            <td>{storeId}</td>
            <td>{tdate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionListItem;
