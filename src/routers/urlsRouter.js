import { Router } from "express";
import { postURL,getURLById } from "../controllers/urlsController.js";
import { tokenValidation } from "../middlewares/tokenSchemaValidation.js";
import { validateURL } from "../middlewares/urlSchemaValidation.js";

const router = Router();
// 
router.post("/urls/shorten", tokenValidation, validateURL ,postURL);
router.get("/urls/:id", getURLById);

export default router;