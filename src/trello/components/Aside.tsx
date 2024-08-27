import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
// import PeopleIcon from "@mui/icons-material/People";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const Aside = () => {
  return (
    <Grid sx={{ height: "100vh", display: "flex" }}>
      <Box
        sx={{
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          top: "0%",
          backgroundColor: "rgb(34, 29, 36)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: "16px",
            color: "#fff",
            display: "flex",
          }}
        >
          {/* Logo y nombre del espacio de trabajo */}
          <Typography
            sx={{
              background: "rgb(204, 97, 163)",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              color: "rgba(0,0,0.1)",
              fontWeight: 900,
              fontSize: "20px",
            }}
          >
            E
          </Typography>
          <Typography
            sx={{
              color: "rgb(158, 172, 186)",
              fontSize: "17px",
              fontWeight: 600,
              marginLeft: "2%",
            }}
          >
            Espacio de trabajo de Trello
          </Typography>
        </Box>

        {/* Botones */}
        <List>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "2px 16px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <DashboardIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "18px" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Tableros"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "2px 16px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <PersonOutlineTwoToneIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Miembros"
            />
            <ListItemIcon>
              <AddTwoToneIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "22px" }}
              />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "2px 16px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <SettingsIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "18px" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Ajustes del Espacio de trabajo"
            />
          </ListItemButton>
        </List>

        {/* Contenido principal */}
        <Typography
          variant="h6"
          sx={{
            color: "rgb(158, 172, 186)",
            fontSize: "17px",
            fontWeight: 700,
            textAlign: "start",
            position: "relative",
            left: "5%",
          }}
        >
          Vistas del Espacio de trabajo
        </Typography>
        <List>
          <ListItemButton
            sx={{
              textTransform: "none",
              padding: "2px 16px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <ViewListIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "18px" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Tabla"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              textTransform: "none",
              padding: "2px 16px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <CalendarMonthTwoToneIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "18px" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Calendario"
            />
          </ListItemButton>
        </List>

        {/* Tablero Secundario */}
        <List>
          <ListItemButton
            sx={{
              textTransform: "none",
              padding: "2px 16px",
            }}
          >
            <ListItemText
              sx={{
                color: "rgb(158, 172, 186)",
                fontWeight: 700,
                fontSize: "20px",
              }}
              primary="Sus tableros"
            />
            <ListItemIcon>
              <AddTwoToneIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "22px" }}
              />
            </ListItemIcon>
          </ListItemButton>
        </List>

        <Box
          sx={{
            padding: "16px",
            color: "#fff",
            display: "flex",
          }}
        >
          {/* Logo y nombre del espacio de trabajo */}
          <Typography
            sx={{
              background: "rgb(204, 97, 163)",
              width: "27px",
              height: "27px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              color: "rgba(0,0,0.1)",
              fontWeight: 900,
              fontSize: "20px",
            }}
          ></Typography>
          <Typography
            sx={{
              color: "rgb(158, 172, 186)",
              fontSize: "17px",

              marginLeft: "2%",
            }}
          >
            test
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default Aside;
