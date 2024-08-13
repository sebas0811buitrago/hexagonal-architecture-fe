import { z } from "zod";
import {
  BMICalculator,
  BMIDescription,
  BMIUserRecord,
  BodyMetrics,
  bodyMetricsSchema,
  userNameSchema,
} from "../domain/BMI";

export type CreateBMIUserRecordPort = (data: BMIUserRecord) => Promise<void>;

interface CalculateBMIUseCase {
  createBMIUserRecord: CreateBMIUserRecordPort;
}

export const calculateBMIUseCaseSchema = z.object({
  ...bodyMetricsSchema.shape,
  userName: userNameSchema,
});

const calculateBMIUseCase =
  ({ createBMIUserRecord }: CalculateBMIUseCase) =>
  async ({ height, weight, userName }: BodyMetrics & { userName: string }) => {
    calculateBMIUseCaseSchema.parse({ height, weight, userName });

    const bmi = BMICalculator({ height, weight });
    const description = BMIDescription({
      bmi,
      currentHeight: height,
      currentWeight: weight,
    });

    await createBMIUserRecord({
      bmi,

      user: userName,
    });

    return { bmi, description };
  };

export default calculateBMIUseCase;
