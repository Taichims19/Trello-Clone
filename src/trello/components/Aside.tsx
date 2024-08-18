import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const Aside = () => {
  return (
    <Grid>
      <Box
        sx={{
          height: "100vh",

          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(34, 29, 36)",
        }}
      >
        {/* Header */}
        <Box sx={{ padding: "16px", color: "#fff" }}>
          {/* Logo y nombre del espacio de trabajo */}
          <DashboardIcon />
          <Typography variant="h6">Espacio de trabajo de Trello</Typography>
        </Box>

        {/* Botones */}
        <List>
          <ListItemButton
            sx={{ color: "white", textTransform: "none", padding: "12px 16px" }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tableros" />
          </ListItemButton>
          <ListItemButton
            sx={{ color: "white", textTransform: "none", padding: "12px 16px" }}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Miembros" />
          </ListItemButton>
          <ListItemButton
            sx={{ color: "white", textTransform: "none", padding: "12px 16px" }}
          >
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendario" />
          </ListItemButton>
        </List>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1, padding: "16px" }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Monday
          </Typography>
          <Button variant="contained" fullWidth>
            Nueva Tarea
          </Button>
          <TextField label="Descripción" fullWidth />
          <Button variant="contained" fullWidth>
            Añade una Tarjeta
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Aside;
