import bcrypt from "bcrypt"
import supabase from "../config/supabaseClient.js"
import generateToken from "../utils/generateToken.js"

export const signup = async (req, res) => {

  const { name, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        name,
        email,
        password: hashedPassword,
        balance: 10000
      }
    ])
    .select()

  if (error) return res.status(400).json(error)

  const token = generateToken(data[0])

  res.json({ token })
}


export const login = async (req, res) => {

  const { email, password } = req.body

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error || !data) {
    return res.status(404).json({ message: "User not found" })
  }

  const valid = await bcrypt.compare(password, data.password)

  if (!valid) {
    return res.status(400).json({ message: "Invalid password" })
  }

  const token = generateToken(data)

  res.json({ token })

}
export const getUsers = async (req, res) => {

  const { data, error } = await supabase
    .from("users")
    .select("id, name")

  if (error) {
    return res.status(500).json({ message: "Error fetching users" })
  }

  res.json(data)
}