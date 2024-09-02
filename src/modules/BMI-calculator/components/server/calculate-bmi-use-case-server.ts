import calculateBMIUseCase from "../../application/calculate-bmi-use-case";

const calculateBMIUseCaseServer: typeof calculateBMIUseCase =
  ({ createBMIUserRecord }) =>
  async (params) => {
    "use server";
    console.log("server side calculateBMIUseCaseServer", params);
    const response = await calculateBMIUseCase({
      createBMIUserRecord,
    })(params);

    return response;
  };

export default calculateBMIUseCaseServer;
