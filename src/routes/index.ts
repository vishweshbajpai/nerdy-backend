import { Router } from "express";
import signUpRouter from "./Signup";
import loginRouter from "./Login";
import userRouter from "./User";
import permissionRouter from "./Permission";
import { validateToken } from "../middlewares";

const router = Router();

router.use("/signup", signUpRouter);
router.use("/login", loginRouter);

// Protected routes
router.use(validateToken);
router.use("/permissions", permissionRouter);
router.use("/users", userRouter);

export default router;
