"use server";

import { prisma } from "@shared/prisma/prisma";
import { GetBMIRecordsPort } from "../../application/get-bmi-records-use-case";

const getBMIRecordsDatabase: GetBMIRecordsPort = async () => {
  const records = await prisma.bMIRecord.findMany();

  return records.map(({ date, username, id, bmi }) => ({
    user: username,
    id: String(id),
    date: date.toISOString(),
    bmi,
  }));
};

export default getBMIRecordsDatabase;
