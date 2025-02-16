import { Request, Response } from "express"
import { CreateTransaction } from "../../../validationSchema/Transactions"
import TransactionRepo from "../../../database/Repository/Transactionrepo"
import APIResponse from "../../../utils/api"

const createTransactionHandler = async (
    req : Request <{}, {}, CreateTransaction>,
    res : Response
) => {
    try {
        const order = await TransactionRepo.CreateTransaction(req.body)
        APIResponse.success(order, 201).send(res)
    } catch(error) {
        APIResponse.error((error as Error).message).send(res)
    }
}

export default createTransactionHandler