function UserAvatarSection({ user, register, isUpdating }) {
  const currentFullName = user?.user_metadata?.fullName || "";

  return (
    <div className="bg-surface flex h-fit flex-col items-center rounded-3xl border border-white/10 p-8 text-center">
      <div className="group relative mb-4 h-32 w-32 cursor-pointer">
        <div className="bg-primary group-hover:border-primary/50 flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-transparent transition-all">
          {user?.user_metadata?.avatar ? (
            <img
              src={user.user_metadata.avatar}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-background text-5xl font-black">
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
