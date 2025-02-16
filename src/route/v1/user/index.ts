import { Router } from "express";
import createUserHandler from "./create";
import validate from "../../../middleware/validate";
import { createUserSchema } from "../../../validationSchema/user";


const userRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - isVendor
 *         - email
 *         - password
 *         - contactNumber
 *         - isVerified
 *       properties:
 *         name:
 *           type: string
 *           description: This is the user's ID.
 *         isVendor:
 *           type: boolean
 *           description: Indicates whether the profile is a vendor or a client.
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address.
 *         password:
 *           type: string
 *           description: User's password.
 *         contactNumber:
 *           type: string
 *           description: The user's phone number.
 *         isVerified:
 *           type: boolean
 *           description: Indicates whether the user is verified.
 *   ApiResponse:
 *     type: object
 *     properties:
 *       data:
 *         type: object
 *         nullable: true
 * 
 * /api/v1/users/create:
 *   post:
 *     summary: Create a user
 *     tags : [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - contactNumber
 *               - isVendor
 *               - isVerified
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's email address.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               contactNumber:
 *                 type: string
 *                 description: The user's contact number.
 *               isVendor:
 *                 type: boolean
 *                 description: Indicates whether the user is a vendor or not.
 *               isVerified:
 *                 type: boolean
 *                 description: Indicates whether the user is verified.
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */

 userRoutes.post("/create", validate(createUserSchema), createUserHandler);

 export default userRoutes;