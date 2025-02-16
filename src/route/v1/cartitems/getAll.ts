import { Request, Response } from "express";
import cartitemRepo from "../../../database/Repository/cartitemrepo";
import APIResponse from "../../../utils/api";

const getAllCartItemHandler = async (req: Request, res: Response) => {
    try {
      const cartItem = await cartitemRepo.getAllCartItem();
   
      if (cartItem.length === 0) {
        return APIResponse.error("No cart found", 404).send(res);
      }
  
      return APIResponse.success(
        { message: "CartItem retrieved successfully", data: cartItem },
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  export default getAllCartItemHandler;