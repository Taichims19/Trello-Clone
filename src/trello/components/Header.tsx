import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#202225", zIndex: "500" }}
    >
      <Toolbar>
        <DashboardIcon sx={{ color: "GrayText" }} />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 900,
            color: "GrayText",
            marginLeft: "26px",
          }}
        >
          Trello
        </Typography>
        {/* Enlaces de navegación */}
        <Typography
          variant="body1"
          sx={{ color: "white", marginRight: "26px", marginLeft: "26px" }}
        >
          Espacios de trabajo
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "white", marginRight: "26px", marginLeft: "26px" }}
        >
          Reciente
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "white", marginRight: "26px", marginLeft: "26px" }}
        >
          Marcado
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "white", marginRight: "26px", marginLeft: "26px" }}
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

        <SearchIcon />

        <TextField id="search" label="Buscar" variant="outlined" />
        {/* Notificaciones */}
        <IconButton sx={{ color: "white" }}>
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
