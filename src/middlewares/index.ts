import jwt from "jsonwebtoken";
import { Errors, StatusCodes } from "../utils/enums";
import { tokenData } from "../types";
import { Alternates } from "../utils/constants";

export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: "Authorization header not found" });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: "Bearer token expected (JWT)" });
  }

  const token = authHeader.split(" ")[0];
  try {
    const secretKey = process.env.JWT_SECRET ?? Alternates.secretKey;
    const decoded: tokenData = jwt.verify(token, secretKey) as tokenData;
    req.userId = decoded.userId;
    next();
  } catch (err: any) {
    if (err.name === Errors.TOKEN_EXPIRED_ERROR) {
      return res
        .status(StatusCodes.Unauthorized)
        .json({ message: "Token expired" });
    }
    return res
      .status(StatusCodes.Unauthorized)
      .json({ message: "Unauthorized" });
  }
};
