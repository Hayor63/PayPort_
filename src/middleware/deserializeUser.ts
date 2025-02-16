import { NextFunction, Request, Response } from "express";
import { verifyjwt } from "../utils/jwt";
import APIResponse from "../utils/api";

const deserialize = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Authorization Header:", req.headers.authorization);
  try {
    // Get the token from the Authorization header
    const accessToken = (req.headers.authorization || "").replace(
      /^Bearer\s/,
      ""
    );
    if (!accessToken) return next();
    
    // Verify that the token is valid
    const decodedToken = await verifyjwt(accessToken, "accessTokenPrivateKey");
    res.locals.user = decodedToken
    console.log("Decoded User:", decodedToken);
    next();
  } catch (error) {
    // Send an error response if the token is invalid or an error occurs
    APIResponse.error((error as Error).message).send(res);
  }
};

export default deserialize;
