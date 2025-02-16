import { Request, Response } from "express";
import cartitemRepo from "../../../database/Repository/cartitemrepo";
import APIResponse from "../../../utils/api";
import { updateCartItem } from "../../../validationSchema/cartitem";
import ProductModel from "../../../database/models/product";

const updateCartItemHandler = async (
  req: Request<updateCartItem["params"], {}, updateCartItem["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Fetch the existing CartItem
    const cartItem = await cartitemRepo.getById(id);
    if (!cartItem) {
      return APIResponse.error("Cart Item not found", 404).send(res);
    }

    // If quantity is updated, recalculate the subtotal
    if (updateData.quantity) {
      // Get the product price using productId reference
      const product = await ProductModel.findById(cartItem.productId);
      if (!product) {
        return APIResponse.error("Product not found", 404).send(res);
      }

      // Calculate the new subtotal based on updated quantity and product price
      const newSubtotal = updateData.quantity * product.price;
      updateData.Subtotal = newSubtotal; // Set the new Subtotal

      // Optionally, if you're updating other fields (like quantity), retain them
    }

    // Update the CartItem with new data
    const updatedCartItem = await cartitemRepo.updateCartItem(id, updateData);

    return APIResponse.success(updatedCartItem, 200).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default updateCartItemHandler;
