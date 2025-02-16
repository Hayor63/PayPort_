import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import cartitemRepo from "../../../database/Repository/cartitemrepo";
import { deleteCartItem } from "../../../validationSchema/cartitem";

const deleteCartItemHandler = async ( req : Request <{id :string}, {}, deleteCartItem>,
    res :Response
) => {
    try {
        const { id } = req.params
        const deleteCartItem = await cartitemRepo.deleteCartItem(id)
        return APIResponse.success(
            { message: "cart Item deleted successfully", data: deleteCartItem },
            200 
          ).send(res);
    } catch (error) {
        return APIResponse.error((error as Error).message, 500).send(res);
    }
}

export default deleteCartItemHandler