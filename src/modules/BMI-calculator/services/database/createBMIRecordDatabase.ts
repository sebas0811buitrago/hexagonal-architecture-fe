"use server";

import { prisma } from "@shared/prisma/prisma";
import { CreateBMIUserRecordPort } from "../../application/calculate-bmi-use-case";

import { revalidatePath } from "next/cache";

export const createBMIRecordDatabase: CreateBMIUserRecordPort = async ({
  bmi,
  user,
}) => {
  await prisma.bMIRecord.create({
    data: {
      bmi,
      username: user,
    },
  });

  revalidatePath("/bmi-app-router");
};
