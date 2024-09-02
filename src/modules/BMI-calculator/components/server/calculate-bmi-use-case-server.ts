"use server";

import calculateBMIUseCase from "../../application/calculate-bmi-use-case";

const calculateBMIUseCaseServer: typeof calculateBMIUseCase =
  ({ createBMIUserRecord }) =>
  async (params) => {
    console.log("server side calculateBMIUseCaseServer", params);
    const response = await calculateBMIUseCase({
      createBMIUserRecord,
    })(params);

    return response;
  };

export default calculateBMIUseCaseServer;
