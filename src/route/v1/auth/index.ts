import { Router } from "express";
import loginHandler from "./login";
import validate from "../../../middleware/validate";
import { loginSchema } from "../../../validationSchema/user";


const authRoutes = Router();

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
 *         isvendor:
 *           type: boolean
 *           description: Indicates whether the profile is a vendor or a client.
 *         email:
 *           type: string
 *           description: User's email address.
 *         password:
 *           type: string
 *           description: User's password.
 *         contactNumber:
 *           type: number
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
 * /api/v1/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
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

 authRoutes.post("/login", validate(loginSchema), loginHandler);

 export default authRoutes;