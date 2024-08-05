import { Login } from "@login/.";
import { login } from "@login/.";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  return (
    <Login
      onSuccesfulLoggin={() => {
        router.push("/professional-skills");
      }}
      login={login}
    />
  );
};

export default LoginPage;
