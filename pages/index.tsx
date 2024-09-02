import IBMCalculator from "src/modules/BMI-calculator/components/IBMCalculator";
import { createBMIRecordLocalStorage } from "src/modules/BMI-calculator/services/createBMIRecordLocalStorage";
import getBMIRecordsLocaLStorage from "src/modules/BMI-calculator/services/getBMIRecordsLocalStorage";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <IBMCalculator
        createBMIRecord={createBMIRecordLocalStorage}
        getBMIRecords={getBMIRecordsLocaLStorage}
      />
    </main>
  );
}
