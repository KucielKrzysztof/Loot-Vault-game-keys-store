import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo, type UpdateUserArgs } from "../../../services/apiAuth";
import { notifyGeneric, notifyError } from "../../../utils/notifications";
import type { UserResponse } from "@supabase/supabase-js";

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation<
    UserResponse["data"],
    Error,
    UpdateUserArgs
  >({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      notifyGeneric("Profile updated successfully", "X");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => notifyError("Update failed", error.message),
  });

  return { updateUser, isUpdating };
};
