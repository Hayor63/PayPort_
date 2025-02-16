import WalletModel, { Wallet } from "../models/wallet"; // Import the Typegoose model
import { CreateWallet } from "../../validationSchema/wallet"; // Zod type for validation
import TransactionModel from "../models/Transactions";

export default class WalletRepo {
  static createWallet = async (walletData: CreateWallet): Promise<Wallet> => {
    try {
      // Check if the wallet address already exists in the database
      const existingWallet = await WalletModel.findOne({
        walletAddress: walletData.walletAddress,
      });
      if (existingWallet) {
        throw new Error(
          "Wallet address already exists. Please use a different address."
        );
      }

      // Create a new Wallet instance using the Typegoose model
      const wallet = new WalletModel(walletData);

      // Save the instance to the database
      await wallet.save();

      const populatedData = await wallet.populate("userId");

      return populatedData;
    } catch (error) {
      // Handle 'error' as an instance of Error
      if (error instanceof Error) {
        console.error(error.message); // Log the error message
        throw new Error("Error creating wallet: " + error.message);
      } else {
        // Handle unknown error type
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred while creating the wallet.");
      }
    }
  };

  //getWalletById
  static getWalletById: (walletId: string) => Promise<any> = async (
    walletId
  ) => {
    const data = await WalletModel.findById(walletId);
    return data;
  };

  //get all wallet
  static getAllWallet = async () => {
    const wallets = await WalletModel.find();
    return wallets;
  };

  //Delete Wallet
  static deleteWallet = async (walletId: string) => {
    const deletedWallet = await WalletModel.findByIdAndDelete(walletId);
    if (!deletedWallet) {
      throw new Error("Wallet not found");
    }
    return deletedWallet;
  };

  //Update Walllet
  static updateWallet = async (
    id: string,
    updateParams: Partial<CreateWallet>
  ) => {
    const updatedWallet = await WalletModel.findByIdAndUpdate(
      id,
      updateParams,
      { new: true }
    );
    if (!updatedWallet) {
      throw new Error("Wallet not found.");
    }
    return updatedWallet;
  };

  //get wallet balance
  static getWalletBalance: (walletId: string) => Promise<number | null> =
    async (walletId) => {
      try {
        const wallet = await WalletModel.findById(walletId);
        if (!wallet) {
          throw new Error("Wallet not found");
        }
        return wallet.balance;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching wallet balance");
      }
    };

  // Deposit Funds
  static depositFunds = async (
    walletId: string,
    amount: number
  ): Promise<Wallet> => {
    try {
      // Validate amount
      if (amount <= 0) {
        throw new Error("Deposit amount must be greater than zero.");
      }

      // Find the wallet
      const wallet = await WalletModel.findById(walletId);
      if (!wallet) {
        throw new Error("Wallet not found.");
      }

      // Update the wallet's balances
      wallet.amount = amount; 
      wallet.balance += amount;
      wallet.ledgerBalance += amount;

      // Save the updated wallet
      await wallet.save();

      return wallet;
    } catch (error) {
      console.error(error);
      throw new Error("Error depositing funds: " + (error as Error).message);
    }
  };

  // //wallet history
  // static getWalletHistory = async (walletId: string) => {
  //   return await TransactionModel.find({ walletId }).sort({ createdAt: -1 });
  // };
}
