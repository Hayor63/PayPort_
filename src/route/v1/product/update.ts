import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import { updateProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/Repository/productRepo";

const updateProductHandler = async (
    req: Request<updateProduct["params"], {}, updateProduct["body"]>,
    res: Response
  ) => {
    try {
      const { id } = req.params; // Extract the ID from the route parameter
      const updatedData = req.body; // Extract the updated fields from the request body
  
      const updatedProduct = await ProductRepo.updateProduct(id, updatedData);
  
      if (!updatedProduct) {
        return APIResponse.error("Product not found", 404).send(res);
      }
  
      return APIResponse.success(
        { message: "product updated successfully", data: updatedProduct },
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  

export default updateProductHandler;
