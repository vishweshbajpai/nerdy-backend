import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignupSchemaType } from "../zod";

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

export const checkIfUserAlreadyExists = async (email: string) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return foundUser;
};

export const signUp = async ({
  email,
  password,
  name,
  age,
  city,
}: SignupSchemaType) => {
  const hashedPassword = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      age,
      city,
      levels: [1],
    },
  });
  return createdUser;
};
