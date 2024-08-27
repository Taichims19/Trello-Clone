import React, { useEffect } from "react";
import {
  Grid,
  Button,
  Link,
  TextField,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  loginSuccess,
  setError,
  loadSession,
} from "../../store/auth/authSlice";
import { useForm } from "../../hooks/useForm";
import { findUserByEmail } from "../../hooks/userService";
import { AuthLayout } from "../layout/AuthLayout";

import trelloLogo from "../../assets/img/trello-logo-1.2.jpg"; // Ajusta la ruta a tu imagen
import GoogleLoginButton from "../../trello/components/GoogleLoginButton";
import MicrosoftLoginButton from "../../trello/components/MicrosoftLoginButton";
import AppleLoginButton from "../../trello/components/AppleLoginButton";
import SlackLoginButton from "../../trello/components/SlackLoginButton";

const formData = {
  email: "",
  password: "",
};

// const formValidations = {
//   email: [
//     (value: string) => value.includes("@"),
//     "El correo debe de tener una @",
//   ] as [(value: string) => boolean, string],
//   password: [
//     (value: string) => value.length >= 6,
//     "La contraseña debe de tener más de 6 letras",
//   ] as [(value: string) => boolean, string],
// };

export const LoginPage = () => {
  const {
    email: formEmail,
    password,
    onInputChange,

    emailValid,
    passwordValid,
  } = useForm(formData);

  const { errorMessage, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadSession());
  }, []);

  // Redirigir si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const user = findUserByEmail(formEmail);

    if (user && user.password === password) {
      dispatch(
        loginSuccess({ email: user.email, displayName: user.displayName })
      );
    } else {
      dispatch(setError("Credenciales incorrectas"));
    }
  };

  return (
    <AuthLayout title="">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",

          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 0px 18px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <img
            src={trelloLogo} // Reemplaza con la URL de tu imagen
            alt="Imagen de bienvenida"
            width="140" // Ajusta el ancho deseado
            height="70" // Ajusta la altura deseada
            style={{
              position: "relative",
              left: "28%",
              // Puedes agregar estilos personalizados aquí, por ejemplo:
              borderRadius: "10px",
            }}
          />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Introduce tu correo electronico"
                  type="email"
                  placeholder="correo@gmail.com"
                  fullWidth
                  name="email"
                  value={formEmail}
                  onChange={onInputChange}
                  error={!!emailValid}
                  helperText={emailValid}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: emailValid
                          ? "rgba(122, 49, 240, 0.5)"
                          : "",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Introduce contraseña"
                  type="password"
                  placeholder="contraseña"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid}
                  helperText={passwordValid}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: passwordValid
                          ? "rgba(122, 49, 240, 0.5)"
                          : "",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.7)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(122, 49, 240, 0.9)",
                      },
                    },
                  }}
                />
              </Grid>
              {errorMessage && (
                <Grid item xs={12}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    position: "relative",
                    left: "3%",
                    width: "91%",
                    height: "40px",
                    background: "rgba(12, 102, 228, 1)",
                    "&:hover": {
                      background: "rgba(122, 49, 240, 0.6)",
                    },
                  }}
                >
                  Continuar
                </Button>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  marginTop: "4%",
                  left: "35%",

                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>o continúa con</Typography>
              </Box>
              <Grid
                sx={{
                  height: "250px",

                  display: "flex",
                  flexDirection: "column",
                }}
                item
                xs={12}
              >
                {/* Boton  Google login */}
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <GoogleLoginButton />
                </Grid>
                {/* Boton  Micorsoft login */}

                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <MicrosoftLoginButton />
                </Grid>

                {/* Boton  Apple login */}

                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <AppleLoginButton />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                  <SlackLoginButton />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Link
                  component={RouterLink}
                  color="inherit"
                  to="/auth/register"
                >
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};
