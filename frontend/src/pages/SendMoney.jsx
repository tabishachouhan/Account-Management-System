import { useEffect, useState } from "react"
import axios from "axios"

function SendMoney() {

  const [users, setUsers] = useState([])
  const [receiver, setReceiver] = useState("")
  const [amount, setAmount] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {

    axios.get(
      "http://localhost:5000/api/auth/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      setUsers(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])

  const handleTransfer = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/account/transfer",
        {
          receiver_id: receiver,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Transfer Successful")

    } catch (err) {
      console.log(err.response?.data)
      alert("Transfer failed")
    }

  }

  return (

    <div>

      <h2>Send Money</h2>

      <select onChange={(e) => setReceiver(e.target.value)}>

        <option>Select User</option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}

      </select>

      <br/><br/>

      <input
        placeholder="Enter Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleTransfer}>
        Transfer
      </button>

    </div>

  )
}

export default SendMoney