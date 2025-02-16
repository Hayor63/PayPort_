import { Router } from "express";
import { Request, Response } from "express";
import  { User } from "../../../database/models/user";
import userRepo from "../../../database/Repository/userRepo";
import { createUserInput} from "../../../validationSchema/user";
import APIResponse from "../../../utils/api";
// import { formatResponseRecord } from "../../../utils/formatter";
// import JWTRepo from "../../../database/Repository/JWTRepo";

const createUserHandler = async (
    req: Request<{}, {}, createUserInput>,
    res: Response
  ) => {
    try {
      const existingUser = await userRepo.findByEmail(req.body.email);
      if (existingUser) {
        APIResponse.error("User with email already exists!").send(res);
      }
      const user = await userRepo.createUser(req.body);
      APIResponse.success(user, 201).send(res);
    } catch (error) {
      APIResponse.error((error as Error).message).send(res);
    }
  };
  export default createUserHandler; 