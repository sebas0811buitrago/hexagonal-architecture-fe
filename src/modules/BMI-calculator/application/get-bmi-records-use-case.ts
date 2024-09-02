import { BMIRecord } from "../domain/BMI";

export type GetBMIRecordsPort = () => Promise<BMIRecord[]>;

interface GetBMIRecord {
  getBMIRecords: GetBMIRecordsPort;
}

export const getBMIRecordUseCase =
  ({ getBMIRecords }: GetBMIRecord) =>
  async () => {
    return await getBMIRecords();
  };
