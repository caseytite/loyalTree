import TransactionListItem from "./TransactionListItem";

const Table = (props) => {
  const rows = props.tableData.map((item) => {
    <TransactionListItem />;
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
      <tbody></tbody>
    </table>
  );
};

export default Table;
