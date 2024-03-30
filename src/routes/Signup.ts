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
    return res.status(StatusCodes.BadRequest).json({ error: parsed });
  }

  // Check if user already exists
  const foundUser = await checkIfUserAlreadyExists(body.email);
  if (foundUser) {
    return res.status(StatusCodes.BadRequest).json({
      message: "User already exists",
    });
  }

  const createdUser = await signUp(body);

  // Generate JWT
  const signedToken = generateToken(createdUser.id);

  res.status(StatusCodes.Ok).json({
    message: "Signup successful",
    token: signedToken,
    userDetails: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      age: createdUser.age,
      city: createdUser.city,
    },
  });
});

export default router;
