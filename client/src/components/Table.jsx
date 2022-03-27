import TransactionListItem from "./TransactionListItem";

const Table = (props) => {
  const rows = props.tableData.map((item) => {
    return <TransactionListItem
      key={item.id}
      amount={item.amount}
      date={item.created_at}
      id={item.id}
    />;
  });

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
