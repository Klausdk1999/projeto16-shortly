import { Router } from "express";
import { getRanking, getUser , deleteURLById , postURL,getURLById,getShortURL } from "../controllers/urlsController.js";
import { tokenValidation } from "../middlewares/tokenSchemaValidation.js";
import { validateURL } from "../middlewares/urlSchemaValidation.js";

const router = Router();
// 
router.post("/urls/shorten", tokenValidation, validateURL ,postURL);
router.get("/urls/:id", getURLById);
router.get("/urls/open/:shortUrl", getShortURL);
router.delete("/urls/:id",tokenValidation, deleteURLById);
router.get("/users/me", tokenValidation, getUser);
router.get("/ranking", getRanking);

export default router;