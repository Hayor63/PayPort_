import { Request, Response } from "express";
import { UpdateCart } from "../../../validationSchema/cart";
import cartRepo from "../../../database/Repository/cartRepo";
import APIResponse from "../../../utils/api";
import TransactionRepo from "../../../database/Repository/Transactionrepo";
import { updateTransaction } from "../../../validationSchema/Transactions";

const updateTansactionHandler = async (
  req: Request<updateTransaction["params"], {}, updateTransaction["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTransaction = await TransactionRepo.updateTransaction(id, updateData);

    if (!updatedTransaction) {
      return APIResponse.error("Transaction not found", 404).send(res);
    }
    return APIResponse.success(updatedTransaction, 200).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default updateTansactionHandler