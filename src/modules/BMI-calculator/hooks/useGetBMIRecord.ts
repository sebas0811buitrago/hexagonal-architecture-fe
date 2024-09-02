import useSWR from "swr";
import {
  GetBMIRecordsPort,
  getBMIRecordUseCase,
} from "../application/get-bmi-records-use-case";
import { BMIRecord } from "../domain/BMI";

interface UseGetBMIRecords {
  getBMIRecords: GetBMIRecordsPort;
  fallbackData?: BMIRecord[];
}

export const useGetBMIRecords = ({
  getBMIRecords,
  fallbackData,
}: UseGetBMIRecords) => {
  const swr = useSWR(
    "bmi-records",
    getBMIRecordUseCase({
      getBMIRecords,
    }),
    {
      fallbackData,
    },
  );
  return swr;
};
