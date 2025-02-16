// import { Request, Response } from "express";
// import APIResponse from "../../../utils/api";
// import WalletRepo from "../../../database/Repository/walletRepo";
// import { updateWallet } from "../../../validationSchema/wallet";

// const updateWalletHandler = async (
//   req: Request<updateWallet["params"], {}, updateWallet["body"]>,
//   res: Response
// ) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const updatedWallet = await WalletRepo.updateWallet(id, updateData);

//     if (!updatedWallet) {
//       return APIResponse.error("Wallet not found", 404).send(res);
//     }
//     return APIResponse.success(updatedWallet, 200).send(res);
//   } catch (error) {
//     return APIResponse.error((error as Error).message, 500).send(res);
//   }
// };

// export default updateWalletHandler