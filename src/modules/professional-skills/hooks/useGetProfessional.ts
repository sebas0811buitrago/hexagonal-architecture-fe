import useSWR from "swr";
import { getProfessionalUseCase } from "../application/get-professional-use-case";
import getProfessional from "../services/get-professional";
import { ProfessionalId } from "../domain";

interface UseGetProfessional {
  id: ProfessionalId;
}

const useGetProfessional = ({ id }: UseGetProfessional) => {
  const { data, error, isLoading } = useSWR(`/get-professional/${id}`, () =>
    getProfessionalUseCase({ getProfessional })(id),
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetProfessional;
