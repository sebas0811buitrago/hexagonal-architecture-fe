"use client";

import { useForm } from "react-hook-form";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import calculateBMIUseCase, {
  calculateBMIUseCaseSchema,
  CreateBMIUserRecordPort,
} from "../application/calculate-bmi-use-case";
import { z, ZodError } from "zod";
import { useToast } from "@shared/components/ui/use-toast";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table";
import { GetBMIRecordsPort } from "../application/get-bmi-records-use-case";
import { useGetBMIRecords } from "../hooks/useGetBMIRecord";

const {
  height: heightSchema,
  weight: weightSchema,
  ...restSchema
} = calculateBMIUseCaseSchema.shape;

const ibmFormSchema = z.object({
  weight: z.preprocess((val) => Number(val), weightSchema),
  height: z.preprocess((val) => Number(val), heightSchema),
  ...restSchema,
});

type FormBMI = Record<keyof z.infer<typeof ibmFormSchema>, string>;

interface IBMCalculatorProps {
  createBMIRecord: CreateBMIUserRecordPort;
  getBMIRecords: GetBMIRecordsPort;
}

const IBMCalculator = ({
  createBMIRecord,
  getBMIRecords,
}: IBMCalculatorProps) => {
  const [bmi, setBMI] = useState<number>();
  const [bmiDescription, setBMIDescription] = useState<string>();

  const { data: bmiRecords, mutate } = useGetBMIRecords({
    getBMIRecords,
  });

  const form = useForm<FormBMI>({
    resolver: zodResolver(ibmFormSchema),
    defaultValues: {
      height: "",
      weight: "",
      userName: "",
    },
  });

  const { setValue } = form;

  const { toast } = useToast();

  const onSubmit = async (formData: FormBMI) => {
    try {
      const { height, userName, weight } = ibmFormSchema.parse(formData);

      const { bmi, description } = await calculateBMIUseCase({
        createBMIUserRecord: createBMIRecord,
      })({ height, userName, weight });

      setBMI(bmi);
      setBMIDescription(description);

      setValue("userName", userName);

      mutate();
    } catch (error) {
      if (error instanceof ZodError) {
        if (error instanceof ZodError) {
          const errorMessage = error.errors
            .map((error) => error.message)
            .join(", ");

          toast({
            title: errorMessage,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Somehing went wrong",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="max-md: my-auto flex w-full flex-1 justify-center gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex max-w-[500px] flex-1 flex-col gap-[20px]"
          >
            <h1 className="text-2xl leading-tight tracking-tighter">
              Calculate your BMI
            </h1>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (Kg)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        type="number"
                        step="0.1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage aria-live="polite" role="alert" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (m)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        type="number"
                        step="0.1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage aria-live="polite" role="alert" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="sebas" {...field} />
                    </FormControl>
                    <FormMessage aria-live="polite" role="alert" />
                  </FormItem>
                )}
              />

              <div className="grid gap-4">
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
              </div>
            </div>
          </form>
        </Form>

        <Card className="max-w-[300px] flex-1 self-baseline">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="font-normal">
              Current Body Mass Index{" "}
            </CardTitle>
            <CardDescription>{bmiDescription}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-row items-baseline gap-4 p-4">
            <div className="flex items-baseline gap-1 text-2xl leading-none">
              {bmi}
              <span className="text-sm font-normal text-muted-foreground">
                BMI
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="h-[400px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">BMI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bmiRecords?.map(({ bmi, date, id, user }) => {
              return (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    {new Date(date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user}</TableCell>
                  <TableCell className="text-right">{bmi.toFixed(1)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default IBMCalculator;
