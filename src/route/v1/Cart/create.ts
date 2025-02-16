import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { CreateCart } from "../../../validationSchema/cart";
import CartRepo from "../../../database/Repository/cartRepo";


const createCartHandler = async (
  req: Request<{}, {}, CreateCart>,
  res: Response
) => {
  try {
    console.log("Request Body:", req.body); // Debugging log

    const Cart = await CartRepo.createCart(req.body);
    console.log("Created Cart:", Cart); // Check if data is being saved

    APIResponse.success(Cart, 201).send(res);
  } catch (error) {
    console.error("Error creating cart:", error); // Log the error for debugging
    APIResponse.error((error as Error).message).send(res);
  }
};
export default createCartHandler;


