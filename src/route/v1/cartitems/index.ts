import { Router } from "express";
import validate from "../../../middleware/validate";
import { CartitemSchema, deleteCartItemSchema, getSingleCartItem, updateCartItemSchema } from "../../../validationSchema/cartitem";
import createCartitemHandler from "./create";
import authenticateUser from "../../../middleware/authenticateUser";
import updateCartItemHandler from "./update";
import deleteCartItemHandler from "./delete";
import getCartItemByIdHandler from "./getById";
import getAllCartItemHandler from "./getAll";

const cartItemsRoutes = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     cartitems:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: A list of product IDs or names (required)
 *         quantity:
 *           type: number
 *           description: Total number of items in the cart (required, must be positive)
 * 
 * /api/v1/cartItems/create:
 *   post:
 *     summary: Create a new cartitem
 *     tags: [Cartitems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: A list of product IDs or names (required)
 *               quantity:
 *                 type: number
 *                 description: Total number of items in the cart (required, must be positive)
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/cartitems'
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
 *                   example: "An unexpected error occurred"
 * 
 * /api/v1/cartItems/{id}:
 *   patch:
 *     summary: Update a cart item
 *     tags: [Cartitems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: Product ID or name to update
 *               quantity:
 *                 type: number
 *                 description: Updated quantity of the item (must be positive)
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/cartitems'
 *       400:
 *         description: Bad request (e.g., invalid ID or missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 * 
 *   delete:
 *     summary: Delete a cart item
 *     tags: [Cartitems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart item to delete
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart item deleted successfully"
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 * 
 * /api/v1/cartItems/singleCart/{id}:
 *   get:
 *     summary: Get a single cart item
 *     tags: [Cartitems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart item to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/cartitems'
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 * 
 * /api/v1/cartItems/:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cartitems]
 *     responses:
 *       200:
 *         description: Successfully retrieved all cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cartitems'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */

cartItemsRoutes.post(
  "/create",
  authenticateUser,
  validate(CartitemSchema),
  createCartitemHandler
);

cartItemsRoutes.patch(
  "/:id",
  authenticateUser,
  validate(updateCartItemSchema),
  updateCartItemHandler
);
cartItemsRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteCartItemSchema),
  deleteCartItemHandler
);
//get single Cart
cartItemsRoutes.get(
  "/singleCart/:id/",
  authenticateUser,
  validate(getSingleCartItem),
  getCartItemByIdHandler
);

//get ALl Cart
cartItemsRoutes.get(
  "/",
  authenticateUser,
  getAllCartItemHandler
);


export default cartItemsRoutes;
