import Image from "next/image";
import { Inter } from "next/font/google";
import { useAtom } from "jotai";
import { authenticatedUserAtom } from "@login/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [{ email, name }] = useAtom(authenticatedUserAtom);

  return (
    <main>
      Welcome : {name} , {email}
    </main>
  );
}
