import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, type LoginArgs } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { notifyError, notifyGeneric } from "../../../utils/notifications";
import type { AuthResponse } from "@supabase/supabase-js";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation<
    AuthResponse["data"],
    Error,
    LoginArgs
  >({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      notifyGeneric("Welcome back!", "Go Shopping", () =>
        navigate("/products"),
      );
      navigate("/home", { replace: true });
    },
    onError: (error) => {
      console.error("LOGIN ERROR:", error);
      notifyError("Login failed", error.message);
    },
  });
  return { login, isPending };
};
