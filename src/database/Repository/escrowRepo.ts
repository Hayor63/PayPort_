import { CreateEscrowTransaction } from "../../validationSchema/EscrowTransaction";
import EscrowTransactionModel, { EscrowTransaction } from "../models/escrowTransaction";

export default class EscrowTransactionRepo {
  static CreateEscrowTransaction: (escrow:CreateEscrowTransaction ) => Promise<EscrowTransaction> =
  async (escrow) => {
    const data = await EscrowTransactionModel.create(escrow);
    return data;
  };
  
  static async updateEscrowStatus(
    id: string,
    status: string
  ): Promise<EscrowTransaction> {
    try {
      // Update the escrow transaction status by ID
      const updatedEscrow = await EscrowTransactionModel.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() }, // Update status and updatedAt timestamp
        { new: true } // Return the updated document
      );

      if (!updatedEscrow) {
        throw new Error("Escrow transaction not found");
      }

      return updatedEscrow;
    } catch (error) {
      // Log and rethrow for consistent error handling
      console.error("Error updating escrow status:", error);
      throw new Error("Failed to update escrow status.");
    }
  }

  static async getEscrowTransactionById(id: string): Promise<EscrowTransaction> {
    try {
      const transaction = await EscrowTransactionModel.findById(id);

      if (!transaction) {
        throw new Error("Escrow transaction not found");
      }

      return transaction;
    } catch (error) {
      console.error("Error fetching escrow transaction:", error);
      throw new Error("Failed to fetch escrow transaction.");
    }
  }
  static async getAllEscrowTransactions(): Promise<EscrowTransaction[]> {
    try {
      return await EscrowTransactionModel.find();
    } catch (error) {
      console.error("Error fetching escrow transactions:", error);
      throw new Error("Failed to fetch escrow transactions.");
    }
  }


  static async deleteEscrowTransaction(id: string): Promise<EscrowTransaction> {
    try {
      const deletedTransaction = await EscrowTransactionModel.findByIdAndDelete(id);

      if (!deletedTransaction) {
        throw new Error("Escrow transaction not found");
      }

      return deletedTransaction;
    } catch (error) {
      console.error("Error deleting escrow transaction:", error);
      throw new Error("Failed to delete escrow transaction.");
    }
  }
}
