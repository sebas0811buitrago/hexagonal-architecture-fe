import { CreateBMIUserRecordPort } from "../application/calculate-bmi-use-case";
import { createItem } from "./localStorageService";
import { v4 as uuidv4 } from "uuid";

// const createBMRescordApi = ({ calculatedBMI, userNMae }) => {};

export const createBMIRecord: CreateBMIUserRecordPort = async ({
  bmi,
  user,
}) => {
  //   createBMRescordApi({
  //     calculatedBMI: bmi,,
  // userNMae: user
  //   });
  // createItem({
  //   id: uuidv4(),
  //   date: new Date().toDateString(),
  //   bmi,
  //   user,
  // });
};
