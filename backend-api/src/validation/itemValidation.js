import Joi from "joi";

export const createItemSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
});

export const updateItemSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().allow(""),
});
