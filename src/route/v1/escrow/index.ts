import { Router } from "express";
import authenticateUser from "../../../middleware/authenticateUser";
import {
  CreateEscrowTransactionHandler,
} from "./payment";
import {
  EscrowTransactionSchema,
  ReleaseEscrowTransactionSchema,
  verifyPaymentTransactionSchema,
} from "../../../validationSchema/EscrowTransaction";
import ReleaseEscrowFunds from "./fundsRelease";
import validate from "../../../middleware/validate";
import { VerifyPaymentHandler } from "./verifyPayment";


const escrowRoutes = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     EscrowTransaction:
 *       type: object
 *       required:
 *         - buyerId
 *         - sellerId
 *         - amount
 *         - buyerEmail
 *       properties:
 *         buyerId:
 *           type: string
 *           description: The ID of the buyer involved in the transaction.
 *           example: "64bc9ef2e345f48df3a5e2d2"
 *         sellerId:
 *           type: string
 *           description: The ID of the seller involved in the transaction.
 *           example: "64bc9ef2e345f48df3a5e2d3"
 *         amount:
 *           type: number
 *           description: The amount of money in the escrow transaction.
 *           example: 1000
 *         status:
 *           type: string
 *           description: The current status of the transaction.
 *           enum: ["held", "released"]
 *           example: "held"
 *         buyerEmail:
 *           type: string
 *           description: The email of the buyer.
 *           example: "buyer@example.com"
 *
 *     VerifyPaymentTransaction:
 *       type: object
 *       required:
 *         - reference
 *       properties:
 *         reference:
 *           type: string
 *           description: Unique payment reference from Paystack.
 *           example: "ref_12345"
 *
 *     ReleaseEscrowTransaction:
 *       type: object
 *       required:
 *         - id
 *         - confirmation
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the escrow transaction.
 *           example: "64bc9ef2e345f48df3a5e2d4"
 *         confirmation:
 *           type: boolean
 *           description: Confirmation of escrow release.
 *           example: true
 *
 * /api/v1/escrow/payment:
 *   post:
 *     summary: Create an escrow transaction
 *     description: Creates a new escrow transaction.
 *     tags: [EscrowTransaction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EscrowTransaction'
 *     responses:
 *       201:
 *         description: Escrow transaction created successfully.
 *       400:
 *         description: Bad request (e.g., missing required fields).
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/escrow/verify-payment:
 *   post:
 *     summary: Verify a payment transaction
 *     description: Verifies an escrow payment transaction using Paystack.
 *     tags: [EscrowTransaction]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: reference
 *         in: query
 *         required: true
 *         description: Paystack transaction reference.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment transaction verified successfully.
 *       400:
 *         description: Bad request (e.g., invalid transaction reference).
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Escrow transaction not found.
 *       500:
 *         description: Internal server error.
 *
 * /api/v1/escrow/release:
 *   post:
 *     summary: Release escrow funds
 *     description: Confirms the release of escrow funds after verification.
 *     tags: [EscrowTransaction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReleaseEscrowTransaction'
 *     responses:
 *       200:
 *         description: Escrow funds released successfully.
 *       400:
 *         description: Bad request (e.g., missing confirmation).
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */

// Create a new escrow transaction
escrowRoutes.post(
  "/payment",
  authenticateUser, // Ensures user is authenticated
  validate(EscrowTransactionSchema), // Validates the request body
  CreateEscrowTransactionHandler // Processes the request and sends the response
);

escrowRoutes.post(
  "/verify-payment",
  authenticateUser,
  validate(verifyPaymentTransactionSchema),
  VerifyPaymentHandler
);


escrowRoutes.post(
  "/release",
  authenticateUser,
  validate(ReleaseEscrowTransactionSchema),
  ReleaseEscrowFunds
);


export default escrowRoutes;
