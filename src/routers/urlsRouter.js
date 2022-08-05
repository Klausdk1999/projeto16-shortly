import { Router } from "express";
import { deleteURLById, postURL,getURLById,getShortURL } from "../controllers/urlsController.js";
import { tokenValidation } from "../middlewares/tokenSchemaValidation.js";
import { validateURL } from "../middlewares/urlSchemaValidation.js";

const router = Router();
// 
router.post("/urls/shorten", tokenValidation, validateURL ,postURL);
router.get("/urls/:id", getURLById);
router.get("/urls/open/:shortUrl", getShortURL);
router.delete("/urls/:id",tokenValidation, deleteURLById);
export default router;