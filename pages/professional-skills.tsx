import CardProfessional from "@professional-skills/components/CardProfessional";
import useGetProfessional from "@professional-skills/hooks/useGetProfessional";

const ProfesionalSkills = () => {
  const { data: professional } = useGetProfessional({
    id: "103456790",
  });

  return professional ? (
    <main className="p-10">
      <CardProfessional profesional={professional} />
    </main>
  ) : (
    "is loading..."
  );
};

export default ProfesionalSkills;
