import { Router } from "express";
import authenticateUser from "../../../middleware/authenticateUser";
import validate from "../../../middleware/validate";
import createOrderHandler from "./create";
import { deleteOrderSchema, getSingleOrderSchema, OrderSchema, updateOrderSchema } from "../../../validationSchema/order";
import fetchOrderHandler from "./paginate";
import deleteOrderHandler from "./delete";
import updateOrderHandler from "./update";
import getSingleOrderHandler from "./getById";

const orderRoutes = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - cartId
 *         - deliveryFee
 *         - vat
 *         - coupon
 *         - currency
 *         - paymentref
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique identifier for the user placing the order.
 *           example: "user12345"
 *         cartId:
 *           type: string
 *           description: The unique identifier for the cart associated with the order.
 *           example: "cart56789"
 *         totalbill:
 *           type: number
 *           description: The total bill amount for the order. This is automatically calculated on the server.
 *           example: 150.50
 *         deliveryFee:
 *           type: number
 *           description: The delivery fee for the order (must be positive).
 *           example: 10.00
 *         vat:
 *           type: number
 *           description: The VAT for the order (must be positive).
 *           example: 7.50
 *         coupon:
 *           type: number
 *           description: Discount applied via coupon (must be positive).
 *           example: 5.00
 *         currency:
 *           type: string
 *           description: The currency in which the order is billed.
 *           example: "NAIRA"
 *         paymentref:
 *           type: string
 *           description: The payment reference for the order.
 *           example: "pay123ref"
 *
 *     UpdateOrder:
 *       type: object
 *       required:
 *         - cartId
 *         - billingId
 *         - deliveryFee
 *         - vat
 *         - currency
 *       properties:
 *         cartId:
 *           type: string
 *           description: The unique identifier for the cart associated with the order.
 *           example: "cart56789"
 *         billingId:
 *           type: string
 *           description: The billing identifier for the order.
 *           example: "bill12345"
 *         deliveryFee:
 *           type: number
 *           description: The delivery fee for the order (must be a positive number).
 *           example: 10.00
 *         vat:
 *           type: number
 *           description: The VAT for the order (must be 0 or a positive number).
 *           example: 7.50
 *         coupon:
 *           type: number
 *           description: Discount applied via coupon (if any).
 *           example: 5.00
 *         currency:
 *           type: string
 *           description: The currency in which the order is billed.
 *           example: "NAIRA"
 *         paymentId:
 *           type: string
 *           description: The payment identifier for the order.
 *           example: "pay12345"
 *
 *     OrderIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The order ID.
 *           example: "order7890"
 *
 * paths:
 *   /api/v1/order/create:
 *     post:
 *       summary: Create a new order
 *       description: Adds a new order with the provided details. The totalbill is automatically calculated.
 *       tags:
 *         - Orders
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       responses:
 *         201:
 *           description: Order created successfully
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/order:
 *     get:
 *       summary: Get all orders
 *       description: Retrieves all orders placed by users.
 *       tags:
 *         - Orders
 *       responses:
 *         200:
 *           description: List of orders fetched successfully
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/order/{id}:
 *     delete:
 *       summary: Delete an order
 *       description: Deletes an order by its ID.
 *       tags:
 *         - Orders
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The order ID.
 *       responses:
 *         200:
 *           description: Order deleted successfully
 *         404:
 *           description: Order not found
 *         500:
 *           description: Internal server error
 *
 *     patch:
 *       summary: Update an order
 *       description: Updates an existing order by its ID.
 *       tags:
 *         - Orders
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The order ID.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateOrder'
 *       responses:
 *         200:
 *           description: Order updated successfully
 *         400:
 *           description: Bad request
 *         404:
 *           description: Order not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/order/singleOrder/{id}:
 *     get:
 *       summary: Get a single order
 *       description: Retrieves a specific order by its ID.
 *       tags:
 *         - Orders
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The order ID.
 *       responses:
 *         200:
 *           description: Order fetched successfully
 *         404:
 *           description: Order not found
 *         500:
 *           description: Internal server error
 */



orderRoutes.post(
    "/create",
    authenticateUser,
    validate(OrderSchema),
    createOrderHandler
  );

  //get ALl Categories
orderRoutes.get(
  "/",
  authenticateUser,
  fetchOrderHandler
);


//delete Cart
orderRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteOrderSchema),
  deleteOrderHandler
);

//Update Cart
orderRoutes.patch(
  "/:id",
  authenticateUser,
  validate(updateOrderSchema),
  updateOrderHandler
);

//get single Order
orderRoutes.get(
  "/singleOrder/:id",
  authenticateUser,
  validate(getSingleOrderSchema),
  getSingleOrderHandler
);
  
  export default orderRoutes;