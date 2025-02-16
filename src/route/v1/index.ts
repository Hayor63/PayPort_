import { Router } from "express"
import userRoutes from "./user"
import authRoutes from "./auth"
import productRoutes from "./product"
import orderRoutes from "./order"
import categoryRoutes from "./category"
import cartRoutes from "./Cart"
import billRoutes from "./bill"
import escrowRoutes from "./escrow"
// import { ReleaseEscrowFundsRoutes } from "./escrow"
import walletRoutes from "./wallet"
import transactionRoutes from "./Transaction"
import cartItemsRoutes from "./cartitems"

const router = Router()

router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use("/product", productRoutes)
router.use("/order", orderRoutes)
router.use("/category",categoryRoutes)
router.use ("/cartItems", cartItemsRoutes)
router.use ("/cart", cartRoutes)
router.use ("/bill", billRoutes)
router.use ("/wallet", walletRoutes)
router.use ("/transactions", transactionRoutes)
router.use("/escrow", escrowRoutes)
// router.use("/escrow",ReleaseEscrowFundsRoutes);

export default router 
