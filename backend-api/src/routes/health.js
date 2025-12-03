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

/**
 * @openapi
 * /api/health/live:
 *   get:
 *     tags:
 *       - Health
 *     summary: Liveness check
 *     responses:
 *       200:
 *         description: Service alive
 */
router.get("/live", (req, res) => res.json({ status: "alive" }));

/**
 * @openapi
 * /api/health/ready:
 *   get:
 *     tags:
 *       - Health
 *     summary: Readiness check
 *     responses:
 *       200:
 *         description: Service ready
 */
router.get("/ready", (req, res) => {
  const mongoConnected = !!req.app.locals.dbConnected;
  if (!mongoConnected) return res.status(503).json({ status: "not-ready" });

  res.json({ status: "ready" });
});

router.get("/", healthCheck);

export default router;
