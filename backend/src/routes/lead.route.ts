import { Router } from "express";
import { submitLead } from "../controllers/lead.controller";
import { preventDuplicateSubmission } from "../middleware/rateLimiter";

const router = Router();

router.post("/lead", preventDuplicateSubmission, submitLead);

export default router;
