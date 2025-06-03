import express from "express";
const router = express.Router();

import { getFields, createFields } from "../controllers/fieldsController.js";

router.get("/", getFields);
router.post("/", createFields);

export default router;
