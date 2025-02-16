import { Router } from "express";
import authenticateUser from "../../../middleware/authenticateUser";
import validate from "../../../middleware/validate";
import createTransactionHandler from "./create";
import {
  deleteTransactionSchema,
  getTransactionByIdSchema,
  TransactionSchema,
  updateTransactionSchema,
} from "../../../validationSchema/Transactions";
import deleteTransactionHandler from "./delete";
import updateTansactionHandler from "./update";
import getTransactionByIdHandler from "./getById";
import getAllTransactionHandler from "./getAll";

const transactionRoutes = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - orderId
 *         - billId
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user making the transaction.
 *           example: "64bc9ef2e345f48df3a5e2d2"
 *         status:
 *           type: string
 *           enum:
 *             - "pending"
 *             - "completed"
 *             - "failed"
 *           description: The status of the transaction.
 *           example: "pending"
 *         orderId:
 *           type: string
 *           description: The ID of the order related to the transaction.
 *           example: "order12345"
 *         billId:
 *           type: string
 *           description: The ID of the bill related to the transaction.
 *           example: "bill67890"
 *         amount:
 *           type: number
 *           description: The amount involved in the transaction.
 *           example: 150.00
 *
 * /api/v1/transactions/create:
 *   post:
 *     summary: Create a new transaction
 *     description: Creates a new transaction with orderId, billId, and amount.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - billId
 *               - amount
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order related to the transaction.
 *                 example: "order12345"
 *               billId:
 *                 type: string
 *                 description: The ID of the bill related to the transaction.
 *                 example: "bill67890"
 *               amount:
 *                 type: number
 *                 description: The amount for the transaction.
 *                 example: 150.00
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Retrieves a list of all transactions.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     description: Retrieves a single transaction by its ID.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to retrieve.
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 *   patch:
 *     summary: Update a transaction
 *     description: Updates the details of a transaction (e.g., status, orderId, billId).
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["pending", "completed", "failed"]
 *                 description: The updated status of the transaction.
 *                 example: "pending"
 *               orderId:
 *                 type: string
 *                 description: The updated order ID.
 *                 example: "order98765"
 *               billId:
 *                 type: string
 *                 description: The updated bill ID.
 *                 example: "bill54321"
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: Transaction not found.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a transaction
 *     description: Deletes a transaction by ID.
 *     tags: [Transaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to delete.
 *     responses:
 *       200:
 *         description: Transaction deleted successfully.
 *       404:
 *         description: Transaction not found.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

transactionRoutes.post(
  "/create",
  authenticateUser,
  validate(TransactionSchema),
  createTransactionHandler
);

//get all
transactionRoutes.get("/", authenticateUser,  getAllTransactionHandler);

//getbyId
transactionRoutes.get(
  "/:id",
  authenticateUser,
  validate(getTransactionByIdSchema),
  getTransactionByIdHandler
);

// update
transactionRoutes.patch(
  "/:id",
  authenticateUser,
  validate(updateTransactionSchema),
  updateTansactionHandler
);

// delete
transactionRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteTransactionSchema),
  deleteTransactionHandler
);
export default transactionRoutes;
