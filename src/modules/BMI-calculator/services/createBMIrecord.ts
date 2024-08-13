import { CreateBMIUserRecordPort } from "../application/calculate-bmi-use-case";

const createBMIRecordService = () => {};

export const createBMIRecord: CreateBMIUserRecordPort = async ({
  bmi,
  date,
  user,
}) => {
  console.log("record create ", bmi, date, user);
};
