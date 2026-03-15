import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {
    const navigate = useNavigate()


    const [balance, setBalance] = useState(0)

    useEffect(() => {

        const token = localStorage.getItem("token")

        axios.get(
            "http://localhost:5000/api/account/balance",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                setBalance(res.data.balance)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    return (

  <div className="dashboard">

    <div className="card">

      <h2>Account Balance</h2>

      <div className="balance">
        ₹{balance}
      </div>

    </div>

    <div className="card">

      <button onClick={()=>navigate("/send-money")}>
        Send Money
      </button>

      <button onClick={()=>navigate("/statement")}>
        View Statement
      </button>

    </div>

  </div>

)
}

export default Dashboard