import { Toaster } from "react-hot-toast";

function StyledToaster(): React.JSX.Element {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--color-surface)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#7c3aed",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}

export default StyledToaster;
