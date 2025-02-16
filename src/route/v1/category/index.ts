import { Router } from "express";
import validate from "../../../middleware/validate";
import { CategorySchema } from "../../../validationSchema/category";
import createCategoryHandler from "./create";
import authenticateUser from "../../../middleware/authenticateUser";

const categoryRoutes = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     category:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category (required)
 *         image:
 *           type: string
 *           description: The image URL of the category (required)
 *         description:
 *           type: string
 *           description: A brief description of the category (required)
 * 
 * /api/v1/category/create:
 *   post:
 *     summary: Create a new category
 *     tags : [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category (required)
 *               image:
 *                 type: string
 *                 description: The image URL of the category (required)
 *               description:
 *                 type: string
 *                 description: A brief description of the category (required)
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/category'
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
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
categoryRoutes.post(
  "/create",
  authenticateUser,
  validate(CategorySchema),
  createCategoryHandler
);

export default categoryRoutes;