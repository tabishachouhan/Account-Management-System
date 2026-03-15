import express from "express"
import { getBalance, transferMoney, getStatement } from "../controllers/accountController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/balance", authMiddleware, getBalance)
router.post("/transfer", authMiddleware, transferMoney)
router.get("/statement", authMiddleware, getStatement)

export default router