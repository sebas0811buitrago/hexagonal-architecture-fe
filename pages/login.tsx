import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { credentialsSchema, UserCredentials } from "@login/domain/User";
import { Card } from "@shared/components/ui/card";
import { loginUser } from "@login/application/loginUser";
import login from "@login/services/login";
import { authenticatedUserAtom } from "@login/store";
import { useAtom } from "jotai";
import { useToast } from "@shared/components/ui/use-toast";
import { useRouter } from "next/router";
import { ZodError } from "zod";
import { monitoringErrors } from "@shared/services/monitoring-errors";
import { trackingEvent } from "@shared/services/track-events";

export default function Login() {
  const [, setAuthenticatedUser] = useAtom(authenticatedUserAtom);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<UserCredentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(userCredentials: UserCredentials) {
    try {
      const user = await loginUser({
        login,
        trackEvent: trackingEvent,
        monitoring: monitoringErrors,
      })(userCredentials);

      setAuthenticatedUser(user);

      router.push("/");
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
    <Card className="container mt-20 flex min-h-[600px] max-w-lg flex-col justify-center bg-muted">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="sebas" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Login</Button>
        </form>
      </Form>
    </Card>
  );
}
