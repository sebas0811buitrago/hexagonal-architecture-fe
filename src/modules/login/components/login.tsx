import { useForm } from "react-hook-form";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/components/ui/form";
import { credentialsSchema, UserCredentials } from "@login/domain/user";
import { authenticatedUserAtom } from "src/modules/login/store";
import { useAtom } from "jotai";
import { useToast } from "@shared/components/ui/use-toast";
import { ZodError } from "zod";
import { monitoringErrors as monitoring } from "@shared/services/monitoring-errors";
import { trackingEvent as trackEvent } from "@shared/services/track-events";
import {
  LoginUserPort,
  loginUserUseCase,
} from "@login/application/login-user-use-case";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";

interface LoginProps {
  onSuccesfulLogin: () => void;
  login: LoginUserPort;
}

const Login = ({ onSuccesfulLogin, login }: LoginProps) => {
  const [, setAuthenticatedUser] = useAtom(authenticatedUserAtom);

  const { toast } = useToast();

  const form = useForm<UserCredentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(userCredentials: UserCredentials) {
    try {
      const user = await loginUserUseCase({
        login,
        trackEvent,
        monitoring,
      })(userCredentials);

      setAuthenticatedUser(user);

      onSuccesfulLogin();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((error) => error.message)
          .join(", ");

        toast({
          title: errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Somehing went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder="sebas" {...field} />
                      </FormControl>
                      <FormMessage aria-live="polite" role="alert" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>

                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage aria-live="polite" role="alert" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>

                  <div className="flex justify-center">
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="text-accent underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="w-[200px]">
          <Image
            src="/skillview.png"
            alt="Image"
            width={200}
            height={0}
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
