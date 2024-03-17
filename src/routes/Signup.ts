import { Router } from "express";
import { SignupSchema, SignupSchemaType } from "../zod";
import { checkIfUserAlreadyExists, signUp } from "../repositories/Signup";
import { generateToken } from "../repositories/Login";
import { StatusCodes } from "../utils/enums";

const router = Router();

router.post("/", async (req, res) => {
  const body: SignupSchemaType = req.body;

  // Input Validation
  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(StatusCodes.BadRequest).send(parsed.error.issues);
  }

  // Check if user already exists
  const foundUser = await checkIfUserAlreadyExists(body.username);
  if (foundUser) {
    return res.status(StatusCodes.BadRequest).json({
      message: "User already exists",
    });
  }

  const createdUser = await signUp(body);

  // Generate JWT
  const signedToken = generateToken(createdUser.id);

  res.status(StatusCodes.Ok).json({
    message: "Signup successfull",
    token: signedToken,
    userId: createdUser.id,
  });
});

export default router;
