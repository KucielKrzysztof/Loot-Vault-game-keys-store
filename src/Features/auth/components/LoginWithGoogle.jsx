import { loginWithGoogle } from "../../../services/apiAuth";

function LoginWithGoogle() {
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Google Login Error:", err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-background hover:bg-background/60 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full py-3 text-sm font-semibold text-white transition-all disabled:opacity-50"
      >
        <img
          src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
          className="h-5 w-5"
          alt=""
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginWithGoogle;
