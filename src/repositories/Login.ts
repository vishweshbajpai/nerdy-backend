import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenData } from "../types";
import { Alternates } from "../utils/constants";

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  return isValidPassword;
};

export const generateToken = (id: string) => {
  const tokenExpiryTime =
    process.env.JWT_EXPIRATION_TIME ?? Alternates.tokenExpirationTime;
  const secretKey = process.env.JWT_SECRET ?? Alternates.secretKey;
  const treasureHuntKey =
    process.env.TREASURE_HUNT_KEY ?? Alternates.treasureHuntKey;
  const tokenData: tokenData = {
    userId: id,
    key: treasureHuntKey,
  };
  const signedToken = jwt.sign(tokenData, secretKey, {
    expiresIn: tokenExpiryTime,
  });
  return signedToken;
};
