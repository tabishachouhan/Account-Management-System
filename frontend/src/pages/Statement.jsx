import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Statement() {

  const [transactions, setTransactions] = useState([])
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  useEffect(() => {

    const fetchTransactions = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/account/statement",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setTransactions(res.data)

      } catch (err) {
        console.log(err)
      }

    }

    fetchTransactions()

  }, [])

  return (

    <div className="dashboard">

      <h2 style={{textAlign:"center"}}>Account Statement</h2>

      <br/>

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>Receiver</th>
          </tr>
        </thead>

        <tbody>

          {transactions.length === 0 ? (

            <tr>
              <td colSpan="5">No Transactions Found</td>
            </tr>

          ) : (

            transactions.map((tx) => (

              <tr key={tx.id}>

                <td>
                  {new Date(tx.created_at).toLocaleDateString()}
                </td>

                <td
                  className={
                    tx.transaction_type === "credit"
                      ? "credit"
                      : "debit"
                  }
                >
                  {tx.transaction_type}
                </td>

                <td>₹{tx.amount}</td>

                <td>{tx.sender_id}</td>

                <td>{tx.receiver_id}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <br/>

      <div style={{textAlign:"center"}}>

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

      </div>

    </div>

  )

}

export default Statement