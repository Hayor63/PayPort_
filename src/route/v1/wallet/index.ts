import { Router } from "express";
import CreatewalletHandler from "../wallet/create"; // Import the handler
import validate, { validateWallet } from "../../../middleware/validate";
import { deleteWalletSchema, DepositFundsSchema, GetWalletBalanceSchema, getWalletByIdSchema, walletValidationSchema } from "../../../validationSchema/wallet";
import authenticateUser from "../../../middleware/authenticateUser";
// import updateWalletHandler from "./update";
import getWalletByIdHandler from "./getById";
import getAllWalletHandler from "./getAll";
import deletewalletHandler from "./delete";
import depositHandler from "./deposit";
import getWalletBalanceHandler from "./getWalletBalance";

const walletRoutes = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Wallet:
 *       type: object
 *       required:
 *         - userId
 *         - walletAddress
 *         - amount
 *         - balance
 *         - ledgerBalance
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user owning the wallet.
 *           example: "64bc9ef2e345f48df3a5e2d2"
 *         walletAddress:
 *           type: string
 *           description: The unique wallet address.
 *           example: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
 *         amount:
 *           type: number
 *           description: The initial amount stored in the wallet.
 *           example: 100.0
 *         balance:
 *           type: number
 *           description: The current wallet balance.
 *           example: 100.0
 *         ledgerBalance:
 *           type: number
 *           description: The total ledger balance (including pending transactions).
 *           example: 100.0
 *
 *     DepositFunds:
 *       type: object
 *       required:
 *         - walletId
 *         - amount
 *       properties:
 *         walletId:
 *           type: string
 *           description: The ID of the wallet into which funds are being deposited.
 *           example: "64bc9ef2e345f48df3a5e2d2"
 *         amount:
 *           type: number
 *           description: The deposit amount.
 *           example: 50.0
 *
 *     UpdateWallet:
 *       type: object
 *       properties:
 *         walletAddress:
 *           type: string
 *           description: The new wallet address.
 *         amount:
 *           type: number
 *         balance:
 *           type: number
 *         ledgerBalance:
 *           type: number
 *
 * /api/v1/wallet/create:
 *   post:
 *     summary: Create a new wallet
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wallet'
 *     responses:
 *       201:
 *         description: Wallet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Wallet successfully created"
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/wallet/{id}:
 *   get:
 *     summary: Get a wallet by ID
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet ID.
 *     responses:
 *       200:
 *         description: Wallet retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wallet'
 *       404:
 *         description: Wallet not found.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a wallet
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet ID.
 *     responses:
 *       200:
 *         description: Wallet deleted successfully.
 *       404:
 *         description: Wallet not found.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/wallet:
 *   get:
 *     summary: Get all wallets
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all wallets retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wallet'
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/wallet/balance/{id}:
 *   get:
 *     summary: Get wallet balance by wallet ID
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The wallet ID.
 *     responses:
 *       200:
 *         description: Wallet balance retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 100.0
 *       404:
 *         description: Wallet not found.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/wallet/deposit:
 *   post:
 *     summary: Deposit funds into a wallet
 *     tags: [Wallet]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepositFunds'
 *     responses:
 *       201:
 *         description: Funds deposited successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deposit successful"
 *       400:
 *         description: Invalid deposit data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

walletRoutes.post(
  "/create",
  authenticateUser,
  validate(walletValidationSchema),
  CreatewalletHandler
);

// Update wallet
// walletRoutes.patch(
//   "/:id",
//   authenticateUser,
//   validate(updateWalletSchema),
//   updateWalletHandler
// );

// Get wallet by ID
walletRoutes.get(
  "/:id",
  authenticateUser,
  validate(getWalletByIdSchema),
  getWalletByIdHandler
);

// Get all wallets
walletRoutes.get(
  "/",
  authenticateUser,
  getAllWalletHandler
);

// Delete wallet
walletRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteWalletSchema),
  deletewalletHandler
);

// Get wallet balance (using wallet ID from URL)
walletRoutes.get(
  "/balance/:id",
  authenticateUser,
  validate(GetWalletBalanceSchema),
  getWalletBalanceHandler
);

// Deposit funds (expects walletId and amount in req.body)
walletRoutes.post(
  "/deposit",
  authenticateUser,
  validate(DepositFundsSchema),
  depositHandler
);
export default walletRoutes;
