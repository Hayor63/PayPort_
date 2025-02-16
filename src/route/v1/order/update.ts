import { Request, Response } from "express";
import orderRepo from "../../../database/Repository/orderRepo";
import APIResponse from "../../../utils/api";
import { updateOrder } from "../../../validationSchema/order";

const updateOrderHandler = async (
  req: Request<{ id: string }, {}, Partial<updateOrder["body"]>>, 
  res: Response
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Fetch existing order from database
    const existingOrder = await orderRepo.getById(id);
    if (!existingOrder) {
      return APIResponse.error("Order not found", 404).send(res);
    }

    // Extract necessary values (fallback to existing order if not provided)
    const subtotal = existingOrder.subtotal;
    const deliveryFee = updatedData.deliveryFee ?? existingOrder.deliveryFee;
    const vat = updatedData.vat ?? existingOrder.vat;
    const coupon = updatedData.coupon ?? existingOrder.coupon ?? 0;

    // Calculate totalBill dynamically
    const totalBill = subtotal + vat + deliveryFee - coupon;

    // Ensure totalBill is included in update
    const finalUpdatedData = { 
      ...updatedData, 
      totalBill 
    };

    // Update the order in the database
    const updatedOrder = await orderRepo.updateOrder(id, finalUpdatedData);

    return APIResponse.success(updatedOrder, 200).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default updateOrderHandler 
