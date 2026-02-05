import type { UseFormRegister } from "react-hook-form";
import type { ProfileFormValues } from "../ProfilePage";
import type { User } from "@supabase/supabase-js";

interface UserAvatarSectionProps {
  user: User | null;
  register: UseFormRegister<ProfileFormValues>;
  isUpdating: boolean;
}

function UserAvatarSection({
  user,
  register,
  isUpdating,
}: UserAvatarSectionProps): React.JSX.Element {
  const currentFullName: string =
    user?.user_metadata?.fullName || user?.user_metadata?.full_name || "User";

  const avatarUrl: string =
    user?.user_metadata?.avatar ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "";

  return (
    <div className="bg-surface flex h-fit flex-col items-center rounded-3xl border border-white/10 p-8 text-center">
      <div className="group relative mb-4 h-32 w-32 cursor-pointer">
        <div className="bg-primary group-hover:border-primary/50 flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-transparent shadow-inner transition-all">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${currentFullName}'s avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-background text-5xl font-black select-none">
              {currentFullName[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-[10px] font-bold tracking-wider text-white uppercase">
            Change Photo
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUpdating}
            {...register("avatar")}
          />
        </label>
      </div>

      <p className="text-xs font-bold text-white/30 uppercase">Account ID</p>
      <p className="text-[10px] break-all text-white/20">{user?.id}</p>
    </div>
  );
}

export default UserAvatarSection;
