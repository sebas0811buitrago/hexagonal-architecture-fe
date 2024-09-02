import { CreateBMIUserRecordPort } from "../application/calculate-bmi-use-case";
import { createItem } from "./localStorageService";
import { v4 as uuidv4 } from "uuid";

export const createBMIRecordLocalStorage: CreateBMIUserRecordPort = async ({
  bmi,
  user,
}) => {
  createItem({
    id: uuidv4(),
    date: new Date().toDateString(),
    bmi,
    user,
  });
};
