import cartRepo from '../../../database/Repository/cartRepo';
import APIResponse from '../../../utils/api';
import { Request, Response } from 'express';
import { deleteTransaction } from '../../../validationSchema/Transactions';
import TransactionRepo from '../../../database/Repository/Transactionrepo';



const deleteTransactionHandler = async ( req : Request <{id :string}, {}, deleteTransaction>,
    res :Response
) => {
    try {
        const { id } = req.params
        const deleteTransaction = await TransactionRepo.deleteTransaction(id)
        return APIResponse.success(
            { message: "Transaction  deleted successfully", data:deleteTransaction  },
            200 
          ).send(res);
    } catch (error) {
        return APIResponse.error((error as Error).message, 500).send(res);
    }
}

export default deleteTransactionHandler