import { Request, Response } from "express";
import { UpdateCart } from "../../../validationSchema/cart";
import cartRepo from "../../../database/Repository/cartRepo";
import APIResponse from "../../../utils/api";

const updateCartHandler = async (
  req: Request<UpdateCart["params"], {}, UpdateCart["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCart = await cartRepo.updateCart(id, updateData);

    if (!updatedCart) {
      return APIResponse.error("Cart not found", 404).send(res);
    }
    return APIResponse.success(updatedCart, 200).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default updateCartHandler