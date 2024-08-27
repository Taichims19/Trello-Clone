import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
// import { useAuthContext } from "../../context/AuthContext";

const MicrosoftLoginButton = () => {
  // const { loginWithGoogle } = useAuthContext();

  const handleMicrosoftLogin = useGoogleLogin({
    // onSuccess: (tokenResponse) => loginWithGoogle(tokenResponse.access_token),
    // onError: () => console.error("Login Failed"),
  });

  return (
    <Button
      onClick={() => handleMicrosoftLogin()}
      variant="contained"
      fullWidth
      style={{
        position: "relative",

        width: "190%",
        height: "38px",
        color: "black",
        background: "white",
        textTransform: "none",
        padding: "10px 10px",
        fontSize: "17px",
        fontWeight: "700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(0,0,0,0.3)",
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
        alt="Microsoft Logo"
        style={{ marginRight: "10px", width: "25px", height: "25px" }}
      />
      Microsoft
    </Button>
  );
};

export default MicrosoftLoginButton;
