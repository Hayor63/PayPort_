import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import TransactionRepo from "../../../database/Repository/Transactionrepo";

const getAllTransactionHandler = async (req: Request, res: Response) => {
    try {
      const transaction = await TransactionRepo.getAllTransaction();
   
      if (transaction.length === 0) {
        return APIResponse.error("No Transaction found", 404).send(res);
      }
  
      return APIResponse.success(
        { message: "Transaction retrieved successfully", data: transaction},
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  export default getAllTransactionHandler;