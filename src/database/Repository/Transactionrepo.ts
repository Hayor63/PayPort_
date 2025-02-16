import { CreateTransaction } from "../../validationSchema/Transactions";
import TransactionModel, { Transaction } from "../models/Transactions";

export default class TransactionRepo {
  static CreateTransaction: (
    Transaction: CreateTransaction
  ) => Promise<Transaction> = async (Transaction) => {
    const data = await TransactionModel.create(Transaction);
    return data;
  };

  //Delete Transaction
  static deleteTransaction: (transactionId: string) => Promise<any> = async (
    transactionId
  ) => {
    const data = await TransactionModel.findByIdAndDelete(transactionId);
    return data;
  };

  //Update Transaction
  static updateTransaction: (
    id: string,
    updateParams: Partial<CreateTransaction>
  ) => Promise<any> = async (id, updateParams) => {
    return await TransactionModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
  };

  //get all Transaction
  static getAllTransaction = async () => {
    const cart = await TransactionModel.find();
    return cart;
  };

  //getTransactionById
  static getTransactionById: (transactionId: string) => Promise<any> = async (
    transactionId
  ) => {
    const data = await TransactionModel.findById(transactionId);
    return data;
  };
}
