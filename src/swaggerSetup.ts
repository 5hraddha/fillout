import swaggerUi from "swagger-ui-express";
import express from "express";
import swaggerSpec from "./swagger.spec.json";

const router = express.Router();

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpec));

export default router;
