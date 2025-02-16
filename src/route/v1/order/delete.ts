import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { deleteOrder } from "../../../validationSchema/order";
import orderRepo from "../../../database/Repository/orderRepo";

const deleteOrderHandler = async (
  req: Request<{ id: string }, {}, deleteOrder>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deleteOrder = await orderRepo.deleteOrder(id);
    return APIResponse.success(
      { message: "order deleted successfully", data: deleteOrder },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};



export default deleteOrderHandler;
