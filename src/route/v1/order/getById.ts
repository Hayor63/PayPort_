;import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { getSingleOrder } from "../../../validationSchema/order";
import orderRepo from "../../../database/Repository/orderRepo";


const getSingleOrderHandler = async (
  req: Request<{ id: string }, {}, getSingleOrder>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getSingleOrder = await orderRepo.getById(id);
    return APIResponse.success(
      { message: "Order retrieved successfully", data:  getSingleOrder  },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};



export default getSingleOrderHandler;