import { SignInResponse, signIn } from "next-auth/react";
import { UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "react-query";
import { useMutation, useQueryClient } from "react-query";

interface ILoginPayload {
  email: string;
  password: string;
}

export const useLogin = (
  formMethods?: UseFormReturn<ILoginPayload>
): UseMutationResult<
  SignInResponse | undefined,
  SignInResponse,
  ILoginPayload
> => {
  const queryClient = useQueryClient();

  return useMutation(
    (credentials) =>
      signIn("credentials", {
        redirect: false,
        ...credentials,
      }),
    {
      onSuccess: (data: any) => {
        // data can have property status
        // data.ok always return true if signIn react api either authorized or not
        // data.status always return 200 if signIn react api either authorized or not
        // The final method to check if there is an error is to check property error
        if (data?.error) {
          formMethods?.setError("email", { message: "Invalid Email" });
          formMethods?.setError("password", { message: "Invalid Password" });
          // console.log(`Unauthorized`, data);
        } else {
          // invalidate all cached data in react query
          // console.log(`Authorized`, data);
          queryClient.invalidateQueries();
        }
      },
      onError: (error) => {
        console.log("Something went wrong");
        console.log(error);
      },
    }
  );
};
