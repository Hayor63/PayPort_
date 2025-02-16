import { Request, Response } from "express";
import { getSingleCartItemSchema } from "../../../validationSchema/cartitem";
import cartitemRepo from "../../../database/Repository/cartitemrepo";
import APIResponse from "../../../utils/api";

const getCartItemByIdHandler = async (
    req: Request<{ id: string }, {}, getSingleCartItemSchema>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const getSingleCartItem = await cartitemRepo.getById(id);
      return APIResponse.success(
        { message: "cart retrived successfully", data: getSingleCartItem },
        200 
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  export default  getCartItemByIdHandler;