import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@shared/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/components/ui/card";

import { Professional } from "@professional-skills/domain";
import { Badge } from "@shared/components/ui/badge";

type CardProfessionalProps = { profesional: Professional };

const CardProfessional = ({ profesional }: CardProfessionalProps) => {
  const { admissionDate, id, lastName, name } = profesional;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional</CardTitle>
        <CardDescription>Evaluate professional skills</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>SB</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {name} {lastName}
              </p>

              <Badge variant={"outline"}>{id}</Badge>
              <Badge variant={"outline"}>{admissionDate}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProfessional;
