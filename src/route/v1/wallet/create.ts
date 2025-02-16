import {  Request, Response } from "express";
import { CreateWallet, walletValidationSchema } from "../../../validationSchema/wallet";  // Zod schema for validation
import WalletRepo from "../../../database/Repository/walletRepo";  // Wallet repository
import APIResponse from "../../../utils/api";

const createWalletHandler = async (
  req: Request<{}, {}, CreateWallet>, 
  res: Response
) => {
  try {
    // Call the createWallet method from the repository
    const wallet = await WalletRepo.createWallet(req.body);

    // Send a success response with the wallet data
    APIResponse.success(wallet, 201).send(res); 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    APIResponse.error(errorMessage).send(res);
  }
};



export default createWalletHandler;


