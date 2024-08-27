import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";

export const AppleLoginButton = () => {
  // const { loginWithGoogle } = useAuthContext();

  const handleAppleLogin = useGoogleLogin({
    // onSuccess: (tokenResponse) => loginWithGoogle(tokenResponse.access_token),
    // onError: () => console.error("Login Failed"),
  });

  return (
    <Button
      onClick={() => handleAppleLogin()}
      variant="contained"
      fullWidth
      style={{
        position: "relative",

        width: "190%",
        height: "38px",
        color: "black",
        background: "white",
        textTransform: "none",
        padding: "10px 0",
        fontSize: "17px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(0,0,0,0.3)",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
        alt="Apple Logo"
        style={{ marginRight: "10px", width: "25px", height: "25px" }}
      />
      Apple
    </Button>
  );
};

export default AppleLoginButton;
