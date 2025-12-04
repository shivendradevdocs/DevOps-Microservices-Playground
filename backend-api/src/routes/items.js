import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validate.js";
import {
  createItemSchema,
  updateItemSchema,
} from "../validation/itemValidation.js";

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

router.post("/", validate(createItemSchema), asyncHandler(createItem));
router.get("/", asyncHandler(getAllItems));
router.get("/:id", asyncHandler(getOneItem));
router.put("/:id", validate(updateItemSchema), asyncHandler(updateItem));
router.delete("/:id", asyncHandler(deleteItem));

export default router;
