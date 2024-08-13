import { z } from "zod";

export const userNameSchema = z
  .string()
  .min(1, "User Name Required")
  .transform((value) => value.trim());

export const bodyMetricsSchema = z.object({
  weight: z
    .number()
    .positive("Kilograms must be a positive number")
    .min(1, "Kilograms must be greater than 1")
    .max(500, "Kilograms must be less than 500"),
  height: z
    .number()
    .positive("Height must be a positive number")
    .min(0.3, "Height must be greater than 0.3 m")
    .max(2.5, "Height must be less than 2.5 m"),
});

export type BodyMetrics = z.infer<typeof bodyMetricsSchema>;

export interface BMIUserRecord {
  bmi: number;
  user: string;
}

export type BMIRecord = BMIUserRecord & { id: string; date: string };

export const BMICalculator = ({ weight, height }: BodyMetrics) => {
  return Number((weight / height ** 2).toFixed(1));
};

const NORMAL_WEIGHT_MIN = 18.5;
const NORMAL_WEIGHT_MAX = 24.9;

const UNDERWEIGHT_THRESHOLD = 18.4;
const NORMAL_THRESHOLD = NORMAL_WEIGHT_MAX;
const OVERWEIGHT_THRESHOLD = 39.9;

interface CalculateWeigthDifference {
  bmi: number;
  currentWeight: number;
  currentHeight: number;
}

export const calculateOverWeight = ({
  currentWeight,
  currentHeight,
}: CalculateWeigthDifference) => {
  return Number(
    Math.abs(currentWeight - NORMAL_WEIGHT_MAX * currentHeight ** 2).toFixed(1),
  );
};

export const calculateUnderWeight = ({
  currentWeight,
  currentHeight,
}: CalculateWeigthDifference) => {
  return Number(
    Math.abs(NORMAL_WEIGHT_MIN * currentHeight ** 2 - currentWeight).toFixed(1),
  );
};

export const BMIDescription = ({
  bmi,
  currentHeight,
  currentWeight,
}: CalculateWeigthDifference) => {
  if (bmi <= UNDERWEIGHT_THRESHOLD)
    return `You are ${calculateUnderWeight({
      bmi,
      currentHeight,
      currentWeight,
    })} kg underweight`;
  if (bmi <= NORMAL_THRESHOLD) return "You have a normal weight";
  if (bmi <= OVERWEIGHT_THRESHOLD)
    return `You are ${calculateOverWeight({
      bmi,
      currentHeight,
      currentWeight,
    })} kg  overweight`;
  return `You are obese: You are ${calculateUnderWeight({
    bmi,
    currentHeight,
    currentWeight,
  })} kg overweight`;
};
