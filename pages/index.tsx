import { useAtom } from "jotai";
import { authenticatedUserAtom } from "@login/store";

export default function Home() {
  const [{ email, name }] = useAtom(authenticatedUserAtom);

  return (
    <main>
      Welcome : {name} , {email}
    </main>
  );
}
