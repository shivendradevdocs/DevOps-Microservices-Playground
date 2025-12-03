/**
 * @openapi
 * /api/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check service health
 *     responses:
 *       200:
 *         description: Service is running
 */

import express from "express";
import { healthCheck } from "../controllers/healthController.js";

const router = express.Router();

router.get("/", healthCheck);

export default router;
