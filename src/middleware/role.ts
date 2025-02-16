import { NextFunction, Request, Response } from "express";
import APIResponse from "../utils/api";

const authorizedRoles = (...allowedRoles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("User Role:", res.locals.user?.role);
    if (!res.locals.user || !allowedRoles.includes(res.locals.user.role)) {
      APIResponse.error("user is not allowed to access this resource").send(
        res
      );
    }
    next();
  };
};
export default authorizedRoles;
