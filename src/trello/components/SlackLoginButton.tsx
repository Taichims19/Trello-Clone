import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";

export const SlackLoginButton = () => {
  // const { loginWithGoogle } = useAuthContext();

  const handleSlackLogin = useGoogleLogin({
    // onSuccess: (tokenResponse) => loginWithGoogle(tokenResponse.access_token),
    // onError: () => console.error("Login Failed"),
  });

  return (
    <Button
      onClick={() => handleSlackLogin()}
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
        src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
        alt="Slack Logo"
        style={{ marginRight: "10px", width: "25px", height: "25px" }}
      />
      Slack
    </Button>
  );
};

export default SlackLoginButton;
