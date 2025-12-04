import Item from "../models/Item.js";
import logger from "../utils/logger.js";

export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    logger.info({ msg: "Item created", itemId: item._id });

    res.json(item);
  } catch (err) {
    logger.error({ msg: "Create Item error", error: err.message });
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    logger.error({ msg: "Get all items error", error: err.message });
    res.status(500).json({ msg: "Server error" });
  }
};

export const getOneItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    res.json(item);
  } catch (err) {
    logger.error({ msg: "Get one item error", error: err.message });
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!item) return res.status(404).json({ msg: "Item not found" });

    logger.info({ msg: "Item updated", itemId: item._id });
    res.json(item);
  } catch (err) {
    logger.error({ msg: "Update item error", error: err.message });
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) return res.status(404).json({ msg: "Item not found" });

    logger.info({ msg: "Item deleted", itemId: item._id });
    res.json({ msg: "Item deleted" });
  } catch (err) {
    logger.error({ msg: "Delete item error", error: err.message });
    res.status(500).json({ msg: "Server error" });
  }
};
