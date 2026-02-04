import { Link } from "react-router-dom";
import FormInput from "../../../ui/FormInput";
import { useLogin } from "../hooks/useLogin";
import AuthForm from "./AuthForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginArgs } from "../../../services/apiAuth";

type LoginFormValues = LoginArgs;

function LoginForm(): React.JSX.Element {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
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
