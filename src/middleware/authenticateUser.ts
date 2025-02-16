import { NextFunction, Request, Response } from "express";
import APIResponse from "../utils/api"

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log("userss", user)
  if (!user) {
    return APIResponse.error("Access token is required").send(res);
  } 
  next();
};

export default authenticateUser;
