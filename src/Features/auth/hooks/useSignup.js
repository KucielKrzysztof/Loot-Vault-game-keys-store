import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/apiAuth";
import { notifyGeneric, notifyError } from "../../../utils/notifications";

export const useSignup = () => {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: (user) => {
      console.log(user);
      notifyGeneric(
        "Account created successfully!",
        "Check your email",
        () => {},
      );
    },
    onError: (err) => notifyError("Registration failed", err.message),
  });

  return { signup, isPending };
};
