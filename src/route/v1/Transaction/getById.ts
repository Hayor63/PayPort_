;import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import TransactionRepo from "../../../database/Repository/Transactionrepo";
import { getSingleTransaction } from "../../../validationSchema/Transactions";


const getTransactionByIdHandler = async (
  req: Request<{ id: string }, {}, getSingleTransaction>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getSingleTransaction = await TransactionRepo.getTransactionById(id);
    return APIResponse.success(
      { message: "Transaction retrived successfully", data: getSingleTransaction },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default  getTransactionByIdHandler;