import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
// import { useAuthContext } from "../../context/AuthContext";

const GoogleLoginButton = () => {
  // const { loginWithGoogle } = useAuthContext();

  const handleGoogleLogin = useGoogleLogin({
    // onSuccess: (tokenResponse) => loginWithGoogle(tokenResponse.access_token),
    // onError: () => console.error("Login Failed"),
  });

  return (
    <Button
      onClick={() => handleGoogleLogin()}
      variant="contained"
      fullWidth
      style={{
        // backgroundColor: "#4285F4",
        position: "relative",

        right: "0%",
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
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        style={{ marginRight: "10px", width: "25px", height: "25px" }}
      />
      Google
    </Button>
  );
};

export default GoogleLoginButton;
