import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import EscrowTransactionRepo from "../../../database/Repository/escrowRepo";

const ReleaseEscrowFunds = async (req: Request, res: Response) => {
  try {
    const { id, confirmation } = req.body;

    // Ensure confirmation is explicitly true before proceeding
    if (!id || confirmation !== true) {
      return APIResponse.error("Invalid request. Confirmation must be true to release funds.").send(res);
    }

    // Proceed to update the transaction status
    const updatedTransaction = await EscrowTransactionRepo.updateEscrowStatus(id, "released");

    if (!updatedTransaction) {
      return APIResponse.error("Escrow transaction not found or status update failed.").send(res);
    }

    return APIResponse.success(
      { message: "Funds released to the seller.", transaction: updatedTransaction },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default ReleaseEscrowFunds;
