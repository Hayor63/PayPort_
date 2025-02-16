import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import orderRepo from "../../../database/Repository/orderRepo";


const fetchOrderHandler: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const { pageNumber, pageSize, sortField, sortType, search, ...rest } =
      req.query;
    const filter = {
      ...(rest && rest),
    };

    const sortLogic =
      sortField && sortType
        ? {
            [sortField as string]: sortType as string | number,
          }
        : undefined;

    const orders = await orderRepo.getPaginatedOrder({
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      filter,
      search: search as string,
      sortLogic,
    });

    if (!orders || orders.length === 0) {
      return APIResponse.error("No orders found", 404).send(res);
    }
    return APIResponse.success(
      { message: "order retrieved successfully", data: orders },
      200
    ).send(res);

  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default fetchOrderHandler;
