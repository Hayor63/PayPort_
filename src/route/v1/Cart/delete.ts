import cartRepo from '../../../database/Repository/cartRepo';
import APIResponse from '../../../utils/api';
import { Request, Response } from 'express';
import { deleteCart } from '../../../validationSchema/cart';



const deleteCartHandler = async ( req : Request <{id :string}, {}, deleteCart>,
    res :Response
) => {
    try {
        const { id } = req.params
        const deleteCart = await cartRepo.deleteCart(id)
        return APIResponse.success(
            { message: "Billing info deleted successfully", data: deleteCart },
            200 
          ).send(res);
    } catch (error) {
        return APIResponse.error((error as Error).message, 500).send(res);
    }
}

export default deleteCartHandler