import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import WalletRepo from "../../../database/Repository/walletRepo";

const getAllWalletHandler = async (req: Request, res: Response) => {
    try {
      const wallet = await WalletRepo.getAllWallet();
   
      if (wallet.length === 0) {
        return APIResponse.error("No wallets found", 404).send(res);
      }
  
      return APIResponse.success(
        { message: "wallet retrieved successfully", data: wallet},
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  export default getAllWalletHandler;