import useSWR from "swr";
import { GetBMIRecordsPort } from "../application/get-bmi-records-use-case";
import { BMIRecord } from "../domain/BMI";
import { getItem, STORAGE_KEY } from "./localStorageService";

const getBMIRecords: GetBMIRecordsPort = async () => {
  return getItem(STORAGE_KEY) as BMIRecord[];
};

export const useGetBMIRecords = () => {
  const swr = useSWR("bmi-records", getBMIRecords);
  return swr;
};

export default getBMIRecords;
