import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { getSingleProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/Repository/productRepo";

const getSingleProductHandler = async (
    req: Request<{ id: string }, {}, getSingleProduct>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const getSingleProduct = await ProductRepo.getById(id);
      return APIResponse.success(
        { message: "Product retrieved successfully", data:  getSingleProduct  },
        200 
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  
  
  export default getSingleProductHandler;