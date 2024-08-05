export type ProfessionalId = string;

export interface Professional {
  id: ProfessionalId;
  name: string;
  lastName: string;
  admissionDate: string;
}

export type Skill = string;

export interface ProfessionalSkillLevel {
  skillName: Skill;
  level: string;
}
