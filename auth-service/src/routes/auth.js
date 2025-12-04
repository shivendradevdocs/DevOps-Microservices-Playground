/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 */

import express from "express";
import { signup, login } from "../controllers/authController.js";
import { signupSchema, loginSchema } from "../validation/authValidation.js";
import validate from "../middleware/validate.js";
import asyncHandler from "../utils/asyncHandler.js";
const router = express.Router();

router.get("/live", (req, res) => res.json({ status: "alive" }));

router.get("/ready", (req, res) => {
  const mongoConnected = !!req.app.locals.dbConnected;
  if (!mongoConnected) return res.status(503).json({ status: "not-ready" });

  res.json({ status: "ready" });
});

router.post("/signup", validate(signupSchema), asyncHandler(signup));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
