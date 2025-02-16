import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import APIResponse from "../utils/api";
import { walletValidationSchema } from "../validationSchema/wallet";
import { ZodError } from "zod";
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    try {
      console.log("Request Body:", req.body); // Log the incoming request body
      console.log("Request Query:", req.query); // Log the query parameters (if any)
      console.log("Request Params:", req.params); // Log the route parameters (if any)

      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      console.log("Validation Passed!"); // Log success if validation passes
      next();
    } catch (error: any) {
      console.error("Validation Error:", error.issues); // Log validation error details
      APIResponse.error(error.issues[0].message, 400).send(res);
    }
  };

    export const validateWallet = (req: Request, res: Response, next: NextFunction) => {
    try {
      walletValidationSchema.parse(req); // Validates the entire request object
      next(); // If valid, proceed to the next middleware/handler
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors }); // Return validation errors
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };

export default validate;
