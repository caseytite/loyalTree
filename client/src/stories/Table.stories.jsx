import Table from "../components/Table";

export default {
  title: "Loyaltree/Table",
  component: Table,
};

const transactions = [{
  "id": 62,
  "giftcard_id": 12,
  "store_id": 4,
  "amount": -600,
  "receiver_id": null,
  "created_at": "2022-03-28T01:34:08.604Z"
},{
  "id": 60,
  "giftcard_id": 10,
  "store_id": 4,
  "amount": -1250,
  "receiver_id": null,
  "created_at": "2022-03-27T02:44:08.604Z"
}]

export const Primary = (props) => {
  return <Table tableData={transactions} />
}