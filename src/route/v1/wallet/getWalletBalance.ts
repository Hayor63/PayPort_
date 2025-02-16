;import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import WalletRepo from "../../../database/Repository/walletRepo";


const getWalletBalanceHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const balance = await WalletRepo.getWalletBalance(id);

    if (balance === null) {
      return APIResponse.error("Wallet not found", 404).send(res);
    }

    return APIResponse.success(
      { message: "Wallet balance retrieved successfully", data: balance },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default getWalletBalanceHandler;
