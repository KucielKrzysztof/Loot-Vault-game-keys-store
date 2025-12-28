import { useForm } from "react-hook-form";
import { useUser } from "../../Features/auth/hooks/useUser";
import { useUpdateUserInfo } from "../../Features/auth/hooks/useUpdateUserInfo";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";

function ProfilePage() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUserInfo();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.user_metadata?.fullName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data) => {
    const updates = {};
    if (data.fullName !== user?.user_metadata?.fullName)
      updates.fullName = data.fullName;
    if (data.email !== user?.email) updates.email = data.email;
    if (data.password) updates.password = data.password;

    /* TODO: AVATAR */

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
        <div className="bg-surface flex h-fit flex-col items-center rounded-3xl border border-white/10 p-8 text-center">
          <div className="group relative">
            <div className="bg-primary text-background mb-4 flex h-32 w-32 items-center justify-center rounded-full text-5xl font-black">
              {user?.user_metadata?.fullName?.[0]?.toUpperCase()}
            </div>
            {/* TODO : AVATAR UPLOAD */}
          </div>
          <p className="text-xs font-bold text-white/30 uppercase">
            Account ID
          </p>
          <p className="text-[10px] break-all text-white/20">{user?.id}</p>
        </div>

        <div className="bg-surface flex flex-col gap-6 rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-primary text-sm font-black tracking-widest uppercase">
              General Info
            </h3>
            <FormInput
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName}
              disabled={isUpdating}
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              disabled={isUpdating}
              validation={{
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              }}
            />
          </div>

          <div className="space-y-4 border-t border-white/5 pt-4">
            <h3 className="text-primary text-sm font-black tracking-widest uppercase">
              Security
            </h3>
            <FormInput
              label="New Password"
              name="password"
              type="password"
              placeholder="Leave empty to keep current"
              register={register}
              error={errors.password}
              disabled={isUpdating}
              validation={{
                minLength: {
                  value: 6,
                  message: "Password must be min. 6 chars",
                },
              }}
            />
            <FormInput
              label="Confirm New Password"
              name="passwordConfirm"
              type="password"
              register={register}
              error={errors.passwordConfirm}
              disabled={isUpdating}
              validation={{
                validate: (val) =>
                  !getValues("password") ||
                  val === getValues("password") ||
                  "Passwords must match",
              }}
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              type="submit"
              disabled={isUpdating}
              className="px-12 font-black uppercase"
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
