import axios from "axios";
import { Request, Response } from "express";
import EscrowTransactionRepo from "../../../database/Repository/escrowRepo";
import { CreateEscrowTransaction } from "../../../validationSchema/EscrowTransaction";
import APIResponse from "../../../utils/api";

// Paystack configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

// Create Escrow Transaction and Initialize Payment
export const CreateEscrowTransactionHandler = async (
  req: Request<{}, {}, CreateEscrowTransaction>,
  res: Response
) => {
  try {
    const { buyerId, sellerId, amount, buyerEmail } = req.body;
    console.log("Buyer ID received:", buyerId);

    if (!buyerId || !sellerId || !amount || !buyerEmail) {
      return APIResponse.error(
        "Missing required fields: buyerId, sellerId, amount, or buyerEmail"
      ).send(res);
    }

    // Step 1: Create the escrow transaction with default status "held"
    const escrowTransaction =
      await EscrowTransactionRepo.CreateEscrowTransaction({
        buyerId,
        sellerId,
        amount,
        status: "held",
        buyerEmail,
      });

    console.log("Created Escrow Transaction:", escrowTransaction); // ✅ Debugging step

    if (!escrowTransaction) {
      return APIResponse.error("Failed to create escrow transaction").send(res);
    }

    // Step 2: Ensure we are getting a valid escrow ID
    const escrowId =
      "_id" in escrowTransaction ? escrowTransaction._id : escrowTransaction.id;
    if (!escrowId) {
      return APIResponse.error("Escrow transaction ID is missing").send(res);
    }

    // Step 3: Initialize payment with Paystack
    const paymentData = {
      amount: amount * 100, // Convert amount to kobo
      email: buyerEmail,
      metadata: { escrowId },
      callback_url: "http://localhost:9000/api-docs", // Replace with actual callback URL
    };

    console.log("Updated Payment Data Sent to Paystack:", paymentData);

    const headers = {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const paymentResponse = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      paymentData,
      { headers }
    );

    if (!paymentResponse.data.status) {
      return APIResponse.error(
        "Failed to initialize payment with Paystack"
      ).send(res);
    }

    // Step 4: Return the payment authorization URL
    const { authorization_url } = paymentResponse.data.data;

    return APIResponse.success(
      {
        escrowTransaction,
        paymentUrl: authorization_url,
      },
      201
    ).send(res);
  } catch (error) {
    console.error("Error in CreateEscrowTransactionHandler:", error); // ✅ Log actual error for debugging
    APIResponse.error("Internal server error").send(res);
  }
};
