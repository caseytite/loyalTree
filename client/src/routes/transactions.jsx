import  { useEffect, useState } from "react"
import axios from 'axios'

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([])

    useEffect(() => {

     axios.get('/transactions')
      .then(res => {
        setTransactions(res.data.data)

      })


  },[])


  const transactionsArr = transactions.map(transaction => {
    return (
      <div key={transaction.id}>{transaction.amount}</div>
    )
  })

  return(
    <>
      {transactionsArr}
    </>
  )

}

export default Transactions
