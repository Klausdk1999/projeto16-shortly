import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { validateSignUp } from "../middlewares/userSchemaValidation.js";
import { validateSignIn } from "../middlewares/userSchemaValidation.js";

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateSignIn, signIn);

export default router;