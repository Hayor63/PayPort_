import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import WalletRepo from "../../../database/Repository/walletRepo";
import { deleteWallet } from "../../../validationSchema/wallet";

const deletewalletHandler = async (
  req: Request<{ id: string }, {}, deleteWallet>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletewallet = await WalletRepo.deleteWallet(id);
    return APIResponse.success(
      { message: "wallet  deleted successfully", data: deletewallet },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default deletewalletHandler;
