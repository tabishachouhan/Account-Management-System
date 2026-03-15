import supabase from "../config/supabaseClient.js"

export const getBalance = async (req, res) => {

  const userId = req.user.id

  const { data, error } = await supabase
    .from("users")
    .select("balance")
    .eq("id", userId)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)
}



export const transferMoney = async (req, res) => {

  const senderId = req.user.id
  const { receiver_id, amount } = req.body

  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single()

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("id", receiver_id)
    .single()

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" })
  }

  // update balances
  await supabase
    .from("users")
    .update({ balance: sender.balance - amount })
    .eq("id", senderId)

  await supabase
    .from("users")
    .update({ balance: receiver.balance + amount })
    .eq("id", receiver_id)

  // create transaction
  await supabase
    .from("transactions")
    .insert([
      {
        sender_id: senderId,
        receiver_id: receiver_id,
        amount: amount,
        transaction_type: "debit"
      },
      {
        sender_id: senderId,
        receiver_id: receiver_id,
        amount: amount,
        transaction_type: "credit"
      }
    ])

  res.json({ message: "Transfer successful" })

}

export const getStatement = async (req, res) => {

  const userId = req.user.id

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  if (error) {
    return res.status(500).json({ message: "Error fetching transactions" })
  }

  res.json(data)

}