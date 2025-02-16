import { Router } from "express";
import { Request, Response } from "express";
import { User } from "../../../database/models/user";
import UserRepo from "../../../database/Repository/userRepo";
import { createUserInput } from "../../../validationSchema/user";
import APIResponse from "../../../utils/api";
import { CreateProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/Repository/productRepo";
import { CreateCartitem } from "../../../validationSchema/cartitem";
import cartitemRepo from "../../../database/Repository/cartitemrepo";

const createCartitemHandler = async (
  req: Request<{}, {}, CreateCartitem>,
  res: Response
) => {
  try {
    const Cartitem = await cartitemRepo.CreateCartitem(req.body);
    APIResponse.success(Cartitem, 201).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default createCartitemHandler;
