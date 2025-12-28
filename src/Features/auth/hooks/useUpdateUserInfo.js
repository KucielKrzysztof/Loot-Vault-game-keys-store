import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "../../../services/apiAuth";
import { notifyGeneric, notifyError } from "../../../utils/notifications";

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      notifyGeneric("Success!", "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => notifyError("Update failed", error.message),
  });

  return { updateUser, isUpdating };
};
