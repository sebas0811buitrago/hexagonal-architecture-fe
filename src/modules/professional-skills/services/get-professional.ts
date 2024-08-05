import { GetProfessionalPort } from "../application/get-professional-use-case";

interface GetProfessionalServiceResponse {
  name: string;
  lastName: string;
  identityNumber: string;
  starDate: string;
}

const getProfessionalService = async (id: string) => {
  return {
    name: "sebas",
    lastName: "buitrago",
    identityNumber: "1036669493",
    starDate: "2023-07-12",
  } satisfies GetProfessionalServiceResponse;
};

const getProfessional: GetProfessionalPort = async (id) => {
  const { identityNumber, lastName, name, starDate } =
    await getProfessionalService(id);

  return {
    id: identityNumber,
    lastName,
    name,
    admissionDate: starDate,
  };
};

export default getProfessional;
