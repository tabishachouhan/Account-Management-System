import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password
        }
      )

      alert("Signup successful")

      navigate("/")   // go to login page

    } catch (err) {

      console.log(err.response?.data)
      alert("Signup failed")

    }

  }

  return (

    <div>

      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleSignup}>
        Signup
      </button>

    </div>

  )

}

export default Signup