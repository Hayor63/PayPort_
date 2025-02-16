import { Router } from "express";
import validate from "../../../middleware/validate";
import { CartSchema, clearCart, deleteCartSchema, getSingleCart, UpdateCartSchema } from "../../../validationSchema/cart";
import createCartHandler from "./create";
import authenticateUser from "../../../middleware/authenticateUser";
import updateCartHandler from "./update";
import deleteCartHandler from "./delete";
import getCartByIdHandler from "./getById";
import clearCartHandler from "./clearCart";
import getAllCartHandler from "./getAll";

const cartRoutes = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - cartItems
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the cart (required).
 *           example: "67ae2ac99d913d12a8f1db5e"
 *         cartItems:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of product IDs in the cart (required).
 *           example: ["cartItemId1", "cartItemId2", "cartItemId3"]
 *         subtotal:
 *           type: number
 *           description: The total cost of the items in the cart.
 *           example: 120.5
 * 
 * /api/v1/cart/create:
 *   post:
 *     summary: Create a new cart
 *     description: Adds a new cart with the provided product IDs.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - cartItems
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who owns the cart.
 *                 example: "67ae2ac99d913d12a8f1db5e"
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of product IDs in the cart (required).
 *                 example: ["cartItemId1", "cartItemId2", "cartItemId3"]
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid data)
 *       500:
 *         description: Internal server error
 * /api/v1/cart:
 *   get:
 *     summary: Get all carts
 *     description: Fetches all carts for the authenticated user.
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: A list of all carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Internal server error
 * /api/v1/cart/{id}:
 *   patch:
 *     summary: Update a cart
 *     description: Updates the cart with the specified ID.
 *     tags: [Cart]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the cart to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of product IDs in the cart.
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid data)
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a cart
 *     description: Deletes the cart with the specified ID.
 *     tags: [Cart]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the cart to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart deleted successfully."
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 * /api/v1/cart/singleCart/{id}:
 *   get:
 *     summary: Get a single cart by ID
 *     description: Fetches a specific cart by its ID for the authenticated user.
 *     tags: [Cart]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the cart to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A cart object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 * /api/v1/cart/clearCart/{userId}:
 *   delete:
 *     summary: Clear a user's cart
 *     description: Clears all items in the cart for the authenticated user.
 *     tags: [Cart]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user whose cart should be cleared.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:

 *                   type: string
 *                   example: "Cart cleared successfully."
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

cartRoutes.post(
  "/create",
  authenticateUser,
  validate(CartSchema),
  createCartHandler
);
//get ALl Cart
cartRoutes.get(
  "/",
  authenticateUser,
  getAllCartHandler
);

cartRoutes.patch(
  "/:id",
  authenticateUser,
  validate(UpdateCartSchema),
  updateCartHandler
);

cartRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteCartSchema),
  deleteCartHandler
);

//get single Cart
cartRoutes.get(
  "/singleCart/:id/",
  authenticateUser,
  validate(getSingleCart),
  getCartByIdHandler
);

//clear Cart
cartRoutes.delete(
  "/clearCart/:userId",
  authenticateUser,
  validate(clearCart),
  clearCartHandler
);

export default cartRoutes;
