import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import cartRepo from "../../../database/Repository/cartRepo";

const getAllCartHandler = async (req: Request, res: Response) => {
    try {
      const cart = await cartRepo.getAllCart();
   
      if (cart.length === 0) {
        return APIResponse.error("No cart found", 404).send(res);
      }
  
      return APIResponse.success(
        { message: "Cart retrieved successfully", data: cart },
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  export default getAllCartHandler;