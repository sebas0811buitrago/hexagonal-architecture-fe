import { GetBMIRecordsPort } from "../application/get-bmi-records-use-case";
import { BMIRecord } from "../domain/BMI";
import { getItem, STORAGE_KEY } from "./localStorageService";

const getBMIRecordsLocaLStorage: GetBMIRecordsPort = async () => {
  return getItem(STORAGE_KEY) as BMIRecord[];
};

export default getBMIRecordsLocaLStorage;
