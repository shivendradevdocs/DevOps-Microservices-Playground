import express from "express";
import {
  createItem,
  getAllItems,
  getOneItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getOneItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
