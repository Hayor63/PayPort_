import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { deleteProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/Repository/productRepo";

const deleteProductHandler = async (
    req: Request<{ id: string }, {}, deleteProduct>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const deleteProduct = await ProductRepo.deleteProduct(id);
      return APIResponse.success(
        { message: "Product deleted successfully", data: deleteProduct },
        200 
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  
  
  export default deleteProductHandler;