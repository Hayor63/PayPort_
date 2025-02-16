;import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { getSingleCartSchema } from "../../../validationSchema/cart";
import cartRepo from "../../../database/Repository/cartRepo";

const getCartByIdHandler = async (
  req: Request<{ id: string }, {}, getSingleCartSchema>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getSingleCart = await cartRepo.getById(id);
    return APIResponse.success(
      { message: "cart retrived successfully", data: getSingleCart },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default  getCartByIdHandler;