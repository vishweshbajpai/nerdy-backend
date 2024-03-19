import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLevelsOfUser = async (userId: string) => {
  const levels = await prisma.user.findFirst({
    select: {
      levels: true,
    },
    where: {
      id: userId,
    },
  });

  return levels;
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
