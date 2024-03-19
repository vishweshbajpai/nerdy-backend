import { Router } from "express";
import { LoginSchema, LoginSchemaType } from "../zod";
import { checkIfUserAlreadyExists } from "../repositories/Signup";
import { generateToken, validatePassword } from "../repositories/Login";
import { StatusCodes } from "../utils/enums";

const router = Router();

router.post("/", async (req, res) => {
  const body: LoginSchemaType = req.body;

  // Input Validation
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(StatusCodes.BadRequest).send(parsed.error.issues);
  }

  // Check if user already exists
  const foundUser = await checkIfUserAlreadyExists(body.email);
  if (!foundUser) {
    return res.status(StatusCodes.BadRequest).json({
      message: "User doesn't exist",
    });
  }

  // Validate password
  const isValidPassword = await validatePassword(
    body.password,
    foundUser.password
  );
  if (!isValidPassword) {
    return res
      .status(StatusCodes.BadRequest)
      .json({ message: "Incorrect password" });
  }

  // Generate JWT
  const signedToken = generateToken(foundUser.id);

  res.status(StatusCodes.Ok).json({
    message: "Login successful",
    token: signedToken,
    userId: foundUser.id,
  });
});

export default router;
