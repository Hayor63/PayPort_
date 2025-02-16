import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { clearCartSchema } from "../../../validationSchema/cart";
import cartRepo from "../../../database/Repository/cartRepo";

const clearCartHandler = async (
    req: Request<{ userId: string }, {}, clearCartSchema>,
    res: Response 
) => {
    try {
        const { userId } = req.params;  
        const clearCart = await cartRepo.clearCart(userId);  
        return APIResponse.success(
          { message: "Cart cleared successfully", data: clearCart },
          200
        ).send(res);
    } catch (error) {
        return APIResponse.error((error as Error).message, 500).send(res);
    }
}

export default clearCartHandler
