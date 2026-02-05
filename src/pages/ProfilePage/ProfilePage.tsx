import { useForm, type SubmitHandler } from "react-hook-form";
import { useUser } from "../../Features/auth/hooks/useUser";
import { useUpdateUserInfo } from "../../Features/auth/hooks/useUpdateUserInfo";
import UserAvatarSection from "./components/UserAvatarSection";
import UserDetailsForm from "./components/UserDetailsForm";

export interface ProfileFormValues {
  fullName: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  avatar?: FileList;
}

function ProfilePage(): React.JSX.Element {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUserInfo();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: user?.user_metadata?.fullName || "",
      email: user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    const updates: any = {};
    if (data.fullName !== user?.user_metadata?.fullName)
      updates.fullName = data.fullName;
    if (data.email !== user?.email) updates.email = data.email;
    if (data.password) updates.password = data.password;

    const avatarFile = data.avatar?.[0];
    if (avatarFile) {
      updates.avatar = avatarFile;
    }

    if (Object.keys(updates).length > 0) {
      updateUser(updates);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-12">
      <h1 className="mb-8 text-3xl font-black text-white uppercase italic">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid gap-8 lg:grid-cols-[1fr_2fr]"
      >
        <UserAvatarSection
          user={user ?? null}
          register={register}
          isUpdating={isUpdating}
        />
        <UserDetailsForm
          register={register}
          errors={errors}
          getValues={getValues}
          isUpdating={isUpdating}
        />
      </form>
    </div>
  );
}

export default ProfilePage;
