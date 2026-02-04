import { useState } from "react";
import { loginWithGoogle } from "../../../services/apiAuth";
import { notifyError } from "../../../utils/notifications";

function LoginWithGoogle(): React.JSX.Element {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      setIsLoggingIn(true);
      await loginWithGoogle();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google authentication failed";
      console.error("Google Login Error:", errorMessage);
      notifyError("Auth Error", errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoggingIn}
        className="bg-background hover:bg-background/60 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full py-3 text-sm font-semibold text-white transition-all disabled:opacity-50"
      >
        <img
          src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
          className="h-5 w-5"
          alt=""
        />
        {isLoggingIn ? "Connecting..." : "Sign in with Google"}
      </button>
    </div>
  );
}

export default LoginWithGoogle;
