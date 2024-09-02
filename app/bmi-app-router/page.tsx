import { getBMIRecordUseCase } from "src/modules/BMI-calculator/application/get-bmi-records-use-case";
import IBMCalculatorV2 from "src/modules/BMI-calculator/components/IBMCalculatorV2";
import { createBMIRecordDatabase } from "src/modules/BMI-calculator/services/database/createBMIRecordDatabase";
import getBMIRecordsDatabase from "src/modules/BMI-calculator/services/database/getBMIRecordsDatabase";

const BMI = async () => {
  const bmiRecords = await getBMIRecordUseCase({
    getBMIRecords: getBMIRecordsDatabase,
  })();

  return (
    <main className="flex flex-col gap-10 p-10">
      <IBMCalculatorV2
        bmiRecords={bmiRecords}
        createBMIRecord={createBMIRecordDatabase}
      />
    </main>
  );
};

export default BMI;
