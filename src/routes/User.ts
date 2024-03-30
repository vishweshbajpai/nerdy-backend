import { Router } from "express";
import { UpdateLevelSchema, UpdateLevelSchemaType } from "../zod";
import { StatusCodes } from "../utils/enums";
import {
  getLevelsOfUser,
  getUserWithId,
  updateLevelOfUser,
} from "../repositories/User";

const router = Router();

router.get("/:userId/levels", async (req, res) => {
  const userId: string = req.params.userId;

  // Check if user already exists
  const foundUser = await getUserWithId(userId);
  if (!foundUser) {
    return res.status(StatusCodes.BadRequest).json({
      message: "User not found",
    });
  }

  const levels = await getLevelsOfUser(userId);
  res.status(StatusCodes.Ok).json({
    message: "Levels loaded successfully",
    levels,
  });
});

router.put("/:userId/levels", async (req, res) => {
  const body: UpdateLevelSchemaType = req.body;
  const userId: string = req.params.userId;

  // Input Validation
  const parsed = UpdateLevelSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(StatusCodes.BadRequest)
      .json({ error: parsed.error.issues });
  }

  // Check if user already exists
  const foundUser = await getUserWithId(userId);
  if (!foundUser) {
    return res.status(StatusCodes.BadRequest).json({
      message: "User not found",
    });
  }

  if (!foundUser.levels.includes(body.level)) {
    await updateLevelOfUser(userId, body.level);
  }
  res.status(StatusCodes.Ok).json({ message: "Level cleared" });
});

export default router;
