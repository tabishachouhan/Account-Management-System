import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()   // ✅ INSIDE COMPONENT

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        try {

            console.log("Login clicked")

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            )

            localStorage.setItem("token", res.data.token)

            alert("Login Successful")

            navigate("/dashboard")   // ✅ redirect after login

        } catch (err) {
            console.log(err.response?.data)
        }

    }
    return (
        <div className="container">

            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            <button onClick={() => navigate("/signup")}>
                Create Account
            </button>

        </div>
    )

}

export default Login