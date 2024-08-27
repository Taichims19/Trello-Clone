import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";

import FlashOnTwoToneIcon from "@mui/icons-material/FlashOnTwoTone";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LinearScaleOutlinedIcon from "@mui/icons-material/LinearScaleOutlined";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const HeaderDashboard = ({ getInitials, handleOpen }) => {
  const { displayName } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "rgba(109, 48, 77, 1)",
          zIndex: "500",
          padding: "0px",
          minHeight: "65px",
        }}
      >
        <Toolbar>
          {/* <ListAltIcon
            sx={{
              color: "rgb(158, 172, 186)",
              width: "25px",
              height: "45px",
              marginLeft: "0px",
              position: "relative",
              right: "1%",
            }}
          /> */}

          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "white",
            }}
          >
            test
          </Typography>
          {/* Enlaces de navegación */}

          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              maxWidth: "40px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <StarBorderOutlinedIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              maxWidth: "60px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <PeopleAltOutlinedIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
          </ListItemButton>

          {/* Botón Crear */}
          <Button
            variant="contained"
            sx={{ borderRadius: 2, background: "rgb(245, 250, 255)" }}
          >
            Tablero
          </Button>

          {/* Spacer */}
          <Box flexGrow={1} />

          {/* Notificaciones */}
          <IconButton sx={{ color: "white" }}>
            <RocketLaunchOutlinedIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <FlashOnTwoToneIcon
              sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
            />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <FilterListOutlinedIcon
              sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
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
          <Button
            sx={{
              marginLeft: "1%",
            }}
            variant="contained"
            color="primary"
            startIcon={<PersonAddAlt1OutlinedIcon />}
          >
            Compartir
          </Button>
          <Button
            sx={{
              // Hace que el botón sea transparente
              backgroundColor: "transparent",
              // Elimina la sombra del botón
              boxShadow: "none",
              // Ajusta el color del texto y del icono según sea necesario
              color: "white",
            }}
            variant="contained"
            startIcon={<LinearScaleOutlinedIcon />}
          ></Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
