import { BMIRecord } from "../domain/BMI";

export type GetBMIRecordsPort = () => Promise<BMIRecord[]>;
