;import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import WalletRepo from "../../../database/Repository/walletRepo";
import { getSingleWallet } from "../../../validationSchema/wallet";


const getWalletByIdHandler = async (
  req: Request<{ id: string }, {}, getSingleWallet>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getSingleWallet = await WalletRepo.getWalletById(id);
    return APIResponse.success(
      { message: "Wallet retrived successfully", data: getSingleWallet },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default  getWalletByIdHandler;