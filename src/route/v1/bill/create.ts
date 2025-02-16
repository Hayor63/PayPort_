import { Router } from "express";
import { Request, Response } from "express";

import { createUserInput } from "../../../validationSchema/user";
import APIResponse from "../../../utils/api";

import { createbill
} from "../../../validationSchema/bill";
import billrepo from "../../../database/Repository/billrepo";
const createbillHandler = async (
  req: Request<{}, {}, createbill>,
  res: Response
) => {
  try {
    const product = await billrepo.createbill(req.body);
    APIResponse.success(product, 201).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default createbillHandler;
