/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/items:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Success
 */

import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validate.js";
import {
  createItemSchema,
  updateItemSchema,
} from "../validation/itemValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import {
  createItem,
  getAllItems,
  getOneItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
const router = express.Router();

// router.post("/", createItem);
// router.get("/", getAllItems);
// router.get("/:id", getOneItem);
// router.put("/:id", updateItem);
// router.delete("/:id", deleteItem);

router.post(
  "/",
  authMiddleware,
  validate(createItemSchema),
  asyncHandler(createItem)
);
router.get("/", authMiddleware, asyncHandler(getAllItems));
router.get("/:id", authMiddleware, asyncHandler(getOneItem));

//admin only routes

// admin only
router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  asyncHandler(updateItem)
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  asyncHandler(deleteItem)
);

export default router;
