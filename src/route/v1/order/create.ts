import { Request, Response } from "express"
import { CreateOrder } from "../../../validationSchema/order"
import orderRepo from "../../../database/Repository/orderRepo"
import APIResponse from "../../../utils/api"

const createOrderHandler = async (
    req: Request<{}, {}, CreateOrder>,
    res: Response
  ) => {
    try {
      const order = await orderRepo.CreateOrder(req.body);
      return APIResponse.success(
        { message: "product created successfully", data: order },
        200
      ).send(res);
    } catch (error) {
      APIResponse.error((error as Error).message).send(res);
    }
  };

export default createOrderHandler