import Button from "../../../ui/Button";
import FormInput from "../../../ui/FormInput";

function UserDetailsForm({ register, errors, getValues, isUpdating }) {
  return (
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
            minLength: { value: 6, message: "Min. 6 characters" },
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
  );
}

export default UserDetailsForm;
