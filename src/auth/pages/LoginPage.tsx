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

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [
    (value: string) => value.includes("@"),
    "El correo debe de tener una @",
  ] as [(value: string) => boolean, string],
  password: [
    (value: string) => value.length >= 6,
    "La contraseña debe de tener más de 6 letras",
  ] as [(value: string) => boolean, string],
};

export const LoginPage = () => {
  const {
    email: formEmail,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const { errorMessage, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedState = localStorage.getItem("auth");
  //   if (storedState && !isAuthenticated) {
  //     dispatch(loadSession());
  //   }
  // }, []); // Eliminamos `isAuthenticated` del array de dependencias.

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
          minHeight: "70vh",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          background: "rgb(50, 130, 181)",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            minHeight: "55vh",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Bienvenido
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Correo"
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
                  label="Contraseña"
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
                    background: "rgba(122, 49, 240, 0.8)",
                    "&:hover": {
                      background: "rgba(122, 49, 240, 0.6)",
                    },
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ textAlign: "center", marginTop: "10px" }}
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
