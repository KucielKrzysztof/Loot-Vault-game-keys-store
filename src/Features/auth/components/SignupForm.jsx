import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";
import AuthForm from "./AuthForm";
import FormInput from "../../../ui/FormInput";
import { Link } from "react-router-dom";

function SignupForm() {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => signup(data);

  const footer = (
    <p className="text-white/50">
      Already have an account?{" "}
      <Link to="/login" className="text-primary font-bold hover:underline">
        Login
      </Link>
    </p>
  );

  return (
    <AuthForm
      title="Create Account"
      buttonLabel="Sign Up"
      isLoading={isPending}
      onSubmit={handleSubmit(onSubmit)}
      footer={footer}
    >
      <FormInput
        name="fullName"
        placeholder="Full Name"
        register={register}
        error={errors.fullName}
        validation={{
          required: "Name is required",
        }}
      />
      <FormInput
        name="email"
        placeholder="Email Address"
        register={register}
        error={errors.email}
        validation={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email format",
          },
        }}
      />
      <FormInput
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        error={errors.password}
        validation={{
          required: "Password is required",
          minLength: { value: 6, message: "Min. 6 characters" },
        }}
      />
      <FormInput
        name="passwordConfirm"
        type="password"
        placeholder="Confirm Password"
        register={register}
        error={errors.passwordConfirm}
        validation={{
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("password") || "Passwords do not match",
        }}
      />
    </AuthForm>
  );
}

export default SignupForm;
