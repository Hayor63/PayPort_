import { Router } from "express";
import validate from "../../../middleware/validate";
import { billSchema, deleteBillSchema, updateBillSchema } from "../../../validationSchema/bill";
import createbillHandler from "./create";
import authenticateUser from "../../../middleware/authenticateUser";
import updateBillHandler from "./update";
import deleteBillHandler from "./delete";

const billRoutes = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - userId
 *         - address
 *         - zipcode
 *         - postalcode
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique identifier of the user (required)
 *           example: "user12345"
 *         address:
 *           type: string
 *           description: The physical address of the user (required)
 *           example: "123 main land , lagos"
 *         zipcode:
 *           type: number
 *           description: The zip code of the user's address (must be positive)
 *           example: 12345
 *         postalcode:
 *           type: number
 *           description: The postal code of the user's address (must be positive)
 *           example: 54321
 * /api/v1/bill/create:
 *   post:
 *     summary: Create a new address
 *     description: Adds a new address for a user with the provided details.
 *     tags:
 *       - bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - address
 *               - zipcode
 *               - postalcode
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user (required)
 *                 example: "user12345"
 *               address:
 *                 type: string
 *                 description: The physical address of the user (required)
 *                 example: "123 Main Land, lagos"
 *               zipcode:
 *                 type: number
 *                 description: The zip code of the user's address (must be positive)
 *                 example: 12345
 *               postalcode:
 *                 type: number
 *                 description: The postal code of the user's address (must be positive)
 *                 example: 54321
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data: userId is required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 * /api/v1/bill/{id}:
 *   patch:
 *     summary: Update an existing bill
 *     description: Updates details of a bill with the given ID.
 *     tags:
 *       - bill
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the bill to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - address
 *               - zipcode
 *               - postalcode
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user (required)
 *                 example: "user12345"
 *               address:
 *                 type: string
 *                 description: The updated physical address of the user
 *                 example: "456 New Road, Lagos"
 *               zipcode:
 *                 type: number
 *                 description: The updated zip code of the user's address
 *                 example: 67890
 *               postalcode:
 *                 type: number
 *                 description: The updated postal code of the user's address
 *                 example: 98765
 *     responses:
 *       200:
 *         description: Bill updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bill updated successfully."
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid bill ID."
 *       404:
 *         description: Bill not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bill with the specified ID was not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 *   delete:
 *     summary: Delete a bill
 *     description: Deletes the bill with the specified ID.
 *     tags:
 *       - bill
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the bill to delete
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bill deleted successfully."
 *       404:
 *         description: Bill not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bill with the specified ID was not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */


billRoutes.post(
  "/create",
  authenticateUser,
  validate(billSchema),
  createbillHandler
);

billRoutes.patch(
  "/:id",
  authenticateUser,
  validate(updateBillSchema),
  updateBillHandler
)

billRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteBillSchema),
  deleteBillHandler
)

export default billRoutes;
