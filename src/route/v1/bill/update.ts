import { Request, Response } from "express";
import { updateBillInfo } from "../../../validationSchema/bill";
import billrepo from "../../../database/Repository/billrepo";
import APIResponse from "../../../utils/api";



const updateBillHandler = async( req : Request<updateBillInfo["params"], {}, updateBillInfo["body"] >,
    res : Response
) => {
 try {
    const { id } = req.params
    const updateData = req.body

    const updatedBillInfo = await billrepo.updateBilling(id, updateData)

    if(!updatedBillInfo) {
        return APIResponse.error("Billing information not found", 404).send(res);
    }

    
    return APIResponse.success(updatedBillInfo, 200).send(res);
 } catch(error) {
    return APIResponse.error((error as Error).message, 500).send(res);
 }
}

export default updateBillHandler