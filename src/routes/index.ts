import express from "express";
import { filterFormSubmissionResponses } from "../controllers/filterReponses";

const router = express.Router();

router.get("/:formId/filteredResponses", filterFormSubmissionResponses);

export default router;
