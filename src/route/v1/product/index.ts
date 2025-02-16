import { Router } from "express";
import authenticateUser from "../../../middleware/authenticateUser";
import validate from "../../../middleware/validate";
import createProductHandler from "./create";
import {
  deleteProductSchema,
  getSingleProductSchema,
  ProductSchema,
  updateProductSchema,
} from "../../../validationSchema/product";
import fetchProductHandler from "./paginate";
import authorizedRoles from "../../../middleware/role";
import updateProductHandler from "./update";
import deleteProductHandler from "./delete";
import getSingleProductHandler from "./getById";

const productRoutes = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       required: 
 *         - title
 *         - price
 *         - instock
 *         - description
 *         - isFeatured
 *         - categoryId
 *       properties:
 *         title:
 *           type: string
 *           description: Name of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         instock:
 *           type: boolean
 *           description: Indicates if the item is available
 *         description:
 *           type: string
 *           description: A brief description of the product
 *         isFeatured:
 *           type: boolean
 *           description: Indicates if the product is featured
 *         categoryId:
 *           type: array
 *           items:
 *             type: string
 *           description: Categories to which the product belongs
 *         sku:
 *           type: number
 *           description: SKU number for the product (optional)
 *         slug:
 *           type: string
 *           description: URL friendly version of the product name (optional)
 * 
 * /api/v1/product/create:
 *   post:
 *     summary: Creates a product
 *     tags: [product]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - instock
 *               - description
 *               - isFeatured
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               instock:
 *                 type: boolean
 *                 description: Indicates if the item is available
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *               isFeatured:
 *                 type: boolean
 *                 description: Indicates if the product is featured
 *               categoryId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of categories for the product
 *               sku:
 *                 type: number
 *                 description: SKU number for the product (optional)
 *               slug:
 *                 type: string
 *                 description: URL friendly version of the product name (optional)
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/products'
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
 * 
 * /api/v1/product/:
 *   get:
 *     summary: Fetch all products
 *     tags: [product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/products'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * 
 * /api/v1/product/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               instock:
 *                 type: boolean
 *                 description: Indicates if the item is available
 *               description:
 *                 type: string
 *                 description: A brief description of the product
 *               isFeatured:
 *                 type: boolean
 *                 description: Indicates if the product is featured
 *               Id:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of categories for the product
 *               sku:
 *                 type: number
 *                 description: SKU number for the product (optional)
 *               slug:
 *                 type: string
 *                 description: URL friendly version of the product name (optional)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/products'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     summary: Delete a product
 *     tags: [product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 * 
 * /api/v1/product/singleProduct/{id}:
 *   get:
 *     summary: Get a single product
 *     tags: [product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/products'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

productRoutes.post(
  "/create",
  authenticateUser,
  validate(ProductSchema),
  createProductHandler
);
productRoutes.get("/", fetchProductHandler);

productRoutes.patch(
  "/:id",
  authenticateUser,
  validate(updateProductSchema),
  updateProductHandler
);

productRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteProductSchema),
  deleteProductHandler
);

//get single Product
productRoutes.get(
  "/singleProduct/:id",
  authenticateUser,
  validate(getSingleProductSchema),
  getSingleProductHandler
);

export default productRoutes;
