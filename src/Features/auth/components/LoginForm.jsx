import { Link } from "react-router-dom";
import FormInput from "../../../ui/FormInput";
import { useLogin } from "../hooks/useLogin";
import AuthForm from "./AuthForm";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    login(data);
  };

  const footer = (
    <p className="text-white/50">
      Don't have an account?{" "}
      <Link to="/register" className="text-primary font-bold hover:underline">
        Sign up
      </Link>
    </p>
  );

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      title="Login to Vault"
      buttonLabel="Login"
      isLoading={isPending}
      footer={footer}
    >
      <FormInput
        name="email"
        placeholder="Email"
        type="email"
        register={register}
        error={errors.email}
        disabled={isPending}
        validation={{
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        }}
      />

      <FormInput
        name="password"
        placeholder="Password"
        type="password"
        register={register}
        error={errors.password}
        disabled={isPending}
      />
    </AuthForm>
  );
}

export default LoginForm;
