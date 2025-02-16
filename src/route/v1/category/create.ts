import { Router } from "express";
import { Request, Response } from "express";
import { User } from "../../../database/models/user";
import UserRepo from "../../../database/Repository/userRepo";
import { createUserInput } from "../../../validationSchema/user";
import APIResponse from "../../../utils/api";
import { CreateProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/Repository/productRepo";
import { createCategory } from "../../../validationSchema/category";
import CategoryRepo from "../../../database/Repository/categoryRepo";

const createCategoryHandler = async (
  req: Request<{}, {}, createCategory>,
  res: Response
) => {
  try {
    const product = await CategoryRepo.createCategory(req.body);
    APIResponse.success(product, 201).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default createCategoryHandler;
