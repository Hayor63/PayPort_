import { deleteBill } from "../../../validationSchema/bill";
import billrepo from '../../../database/Repository/billrepo';
import APIResponse from '../../../utils/api';
import { Request, Response } from 'express';



const deleteBillHandler = async ( req : Request <{id :string}, {}, deleteBill>,
    res :Response
) => {
    try {
        const { id } = req.params
        const deleteBill = await billrepo.deleteBill(id)
        return APIResponse.success(
            { message: "Billing info deleted successfully", data: deleteBill },
            200 
          ).send(res);
    } catch (error) {
        return APIResponse.error((error as Error).message, 500).send(res);
    }
}

export default deleteBillHandler