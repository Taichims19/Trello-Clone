import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../store/auth/authSlice";
import { RootState } from "../../store/store";
import { BoxSesion } from "./BoxSesion";
// import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { displayName } = useSelector((state: RootState) => state.auth);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login");
  };

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names
      .map((name) => name[0].toUpperCase()) // Convertimos a mayúsculas la primera letra
      .join(" ");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#202225", zIndex: "500", padding: "0px" }}
    >
      <Toolbar>
        <ListAltIcon
          sx={{
            color: "rgb(158, 172, 186)",
            width: "25px",
            minHeight: "50px",
            marginLeft: "0px",
            position: "relative",
            right: "1%",
          }}
        />
        <DashboardIcon
          sx={{ color: "rgb(158, 172, 186)", marginLeft: "26px" }}
        />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 900,
            color: "GrayText",
          }}
        >
          Trello
        </Typography>
        {/* Enlaces de navegación */}
        <Typography
          variant="body1"
          sx={{
            color: "rgb(158, 172, 186)",
            marginRight: "26px",
            marginLeft: "26px",
          }}
        >
          Espacios de trabajo
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgb(158, 172, 186)",
            marginRight: "26px",
            marginLeft: "26px",
          }}
        >
          Reciente
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgb(158, 172, 186)",
            marginRight: "26px",
            marginLeft: "26px",
          }}
        >
          Marcado
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgb(158, 172, 186)",
            marginRight: "26px",
            marginLeft: "26px",
          }}
        >
          Plantillas
        </Typography>

        {/* Botón Crear */}
        <Button
          variant="contained"
          sx={{ borderRadius: 2, background: "rgb(87, 157, 255)" }}
        >
          Crear
        </Button>

        {/* Spacer */}
        <Box flexGrow={1} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "45px",
            borderRadius: 2,
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          <InputAdornment position="start">
            <SearchTwoToneIcon
              sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
            />
          </InputAdornment>
          <TextField
            id="search"
            label="Buscar"
            variant="standard"
            fullWidth
            InputProps={{
              sx: {
                "& .MuiInput-input": {
                  paddingLeft:
                    "35px" /* Ajusta este valor según el tamaño del icono */,
                  paddingTop: "18px",
                  color: "rgb(158, 172, 186)",
                  position: "relative",
                  bottom: "2%",
                },
                "& .MuiInput-underline": {
                  "&::before": {
                    borderBottom: "1px solid red",
                    bottom: "-5px", // Ajusta este valor según sea necesario
                  },
                  "&::after": {
                    borderBottom: "2px solid red",
                    bottom: "-5px",
                  },
                },
              },
            }}
          />
        </Box>
        {/* Notificaciones */}
        <IconButton sx={{ color: "white" }}>
          <NotificationsNoneOutlinedIcon
            sx={{
              color: "rgb(158, 172, 186)",
              fontSize: "26px",
              transform: "rotate(40deg)",
            }}
          />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <HelpOutlineOutlinedIcon
            sx={{ color: "rgb(158, 172, 186)", fontSize: "24px" }}
          />
        </IconButton>
        {/* Muestra el nombre del usuario aquí */}
        {displayName && (
          <Button
            color="inherit"
            onClick={handleOpen}
            sx={{
              marginLeft: "1%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              fontSize: "13px",
              padding: "4px",
              letterSpacing: "0px",
              lineHeight: 2,
              minWidth: "38px",
              background: "rgba(0, 82, 204, 1)",
              color: "white",
              borderRadius: 8,

              fontWeight: 500,
            }}
          >
            {getInitials(displayName)}
          </Button>
        )}
      </Toolbar>
      <BoxSesion open={open} handleClose={handleClose} />
    </AppBar>
  );
};

export default Header;
