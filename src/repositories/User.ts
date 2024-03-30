import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserWithId = async (userId: string) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return foundUser;
};

export const getLevelsOfUser = async (userId: string) => {
  const data = await prisma.user.findFirst({
    select: {
      levels: true,
    },
    where: {
      id: userId,
    },
  });
  return data?.levels;
};

export const updateLevelOfUser = async (userId: string, level: number) => {
  const updatedUser = await prisma.user.update({
    data: {
      levels: {
        push: level,
      },
    },
    where: {
      id: userId,
    },
  });
  return updatedUser;
};
