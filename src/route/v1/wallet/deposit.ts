import { Request, Response } from "express";
import WalletRepo from "../../../database/Repository/walletRepo";
import APIResponse from "../../../utils/api";
import { DepositFundsSchema } from "../../../validationSchema/wallet";

const depositHandler = async (req: Request, res: Response) => {
  try {
    // Validate request body using Zod schema
    const { body } = DepositFundsSchema.parse(req); 
    const { walletId, amount } = body; 

    const updatedWallet = await WalletRepo.depositFunds(walletId, amount);
    console.log("updated", updatedWallet);

    return APIResponse.success(
      { message: "Deposit successful", data: updatedWallet },
      201
    ).send(res);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return APIResponse.error(errorMessage, 400).send(res);
  }
};

export default depositHandler;
