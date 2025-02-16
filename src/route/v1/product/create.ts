import { Request, Response } from "express";
import { CreateProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/Repository/productRepo";
import APIResponse from "../../../utils/api";


const createProductHandler = async (
    req: Request<{}, {}, CreateProduct>,
    res: Response
  ) => {
    try {
      const product = await ProductRepo.createProduct(req.body);
      APIResponse.success(product, 201).send(res);
    } catch (error) {
      APIResponse.error((error as Error).message).send(res);
    }
  };
  export default createProductHandler;