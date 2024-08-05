import { Professional, ProfessionalId } from "../domain";

export type GetProfessionalPort = (id: ProfessionalId) => Promise<Professional>;

interface GetProfessionalUseCase {
  getProfessional: GetProfessionalPort;
}

export const getProfessionalUseCase =
  ({ getProfessional }: GetProfessionalUseCase) =>
  async (id: ProfessionalId) => {
    const professional = await getProfessional(id);

    return professional;
  };
