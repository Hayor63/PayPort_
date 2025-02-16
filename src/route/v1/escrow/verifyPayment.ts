import { Request, Response } from "express";
import axios from "axios";
import APIResponse from "../../../utils/api";
import EscrowTransactionRepo from "../../../database/Repository/escrowRepo";

// Paystack configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export const VerifyPaymentHandler = async (req: Request, res: Response) => {
  try {
    const reference = req.query.reference as string;

    if (!reference) {
      return APIResponse.error("Payment reference is required").send(res);
    }

    const headers = {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    };

    // Call Paystack API to verify transaction
    const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, { headers });

    if (!response.data || !response.data.status) {
      console.error("Invalid response from Paystack:", response.data); // Log for debugging
      return APIResponse.error("Invalid response from Paystack").send(res);
    }

    const transactionData = response.data.data;

    if (transactionData?.status === "success") {
      const escrowId = transactionData.metadata?.escrowId;

      if (!escrowId) {
        return APIResponse.error("Escrow ID is missing from metadata").send(res);
      }

      // Update escrow transaction to "released"
      const updatedEscrow = await EscrowTransactionRepo.updateEscrowStatus(escrowId, "paid");

      if (!updatedEscrow) {
        return APIResponse.error("Escrow transaction not found").send(res);
      }

      return APIResponse.success({ message: "Payment confirmed", escrow: updatedEscrow }, 200).send(res);
    }

    console.warn("Payment verification failed:", transactionData);
    return APIResponse.error("Payment verification failed").send(res);
  } catch (error) {
    console.error("VerifyPaymentHandler Error:", error); // Log error for debugging
    return APIResponse.error("Internal server error").send(res);
  }
};
