import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Divider from "@mui/material/Divider";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { RootState } from "../../store/store";
import { logoutSuccess } from "../../store/auth/authSlice";
import { SubMenuTema } from "./SubMenuTema";

export const BoxSesion = ({ open, handleClose }) => {
  const { displayName, email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names
      .map((name) => name[0].toUpperCase()) // Convertimos a mayúsculas la primera letra
      .join(" ");
  };

  const onLogout = () => {
    dispatch(logoutSuccess());
    navigate("/auth/login");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      // Personalizar el Backdrop
      slotProps={{
        backdrop: {
          // Estilo para el Backdrop (fondo transparente con opacidad)
          style: {
            backgroundColor: "rgba(0,0,0,0)", // Ajusta la opacidad según tus necesidades
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          top: "49%",
          left: "87%",
          transform: "translate(-50%, -50%)",
          width: "21%",
          height: "88vh",
          borderRadius: 3,
          background: "rgb(40, 46, 51)",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "auto",
          margin: "20px",
        }}
      >
        {/* botones */}
        <List>
          <Typography
            sx={{
              color: "rgb(158, 172, 186)",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "4%",
            }}
          >
            CUENTA
          </Typography>
          {/* sesion cuenta  */}
          <Box sx={{ display: "flex", width: "100%" }}>
            {/* Muestra el nombre del usuario aquí */}
            {displayName && (
              <Button
                color="inherit"
                sx={{
                  marginLeft: "1%",
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  fontSize: "19px",
                  minWidth: "45px",
                  height: "45px",
                  padding: "2px",
                  letterSpacing: "-2px",
                  lineHeight: 0,
                  background: "rgba(0, 82, 204, 1)",
                  color: "white",
                  borderRadius: 8,
                  fontWeight: 500,
                }}
              >
                {getInitials(displayName)}
              </Button>
            )}
            <Box
              sx={{
                minWidth: "95px",
                maxWidth: "200px",
                position: "relative",
                marginBottom: "5%",
                left: "3%",
              }}
            >
              <Typography
                sx={{
                  marginLeft: "3%",
                  width: "100%",
                  color: "rgb(158, 172, 186)",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                  fontWeight: 300,
                }}
              >
                {displayName}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "3%",
                  color: "rgb(158, 172, 186)",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  fontWeight: 300,
                }}
              >
                {email}
              </Typography>
            </Box>
          </Box>

          {/* Sesion Gestion Cuentas */}
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "2px 2px",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Cambiar cuentas"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "2px 2px",
              marginBottom: "2%",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Gestionar Cuenta"
            />
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <OpenInNewIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
          </ListItemButton>

          <Divider sx={{ background: "rgba(158, 172, 186, 0.3)" }} />

          {/* Sesion Trello */}
          <Typography
            sx={{
              marginTop: "6%",
              marginBottom: "2%",
              color: "rgb(158, 172, 186)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "2px 2px",
            }}
          >
            TRELLO
          </Typography>

          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "3px 2px",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Perfil y visibilidad"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "4px 2px",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Actividad"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "4px 2px",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Tarjetas"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "4px 2px",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Ajustes"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "4px 2px",
              marginBottom: "2%",
            }}
            onClick={handleOpen2}
          >
            <ListItemText sx={{ color: "rgb(158, 172, 186)" }} primary="Tema" />
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <ArrowForwardIosOutlinedIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
          </ListItemButton>

          <SubMenuTema open2={open2} handleClose2={handleClose2} />

          <Divider sx={{ background: "rgba(158, 172, 186, 0.3)" }} />

          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              margin: "3%  0%",
              padding: "5px 2px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <PeopleAltOutlinedIcon
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Crear Espacio de trabajo"
            />
          </ListItemButton>

          <Divider sx={{ background: "rgba(158, 172, 186, 0.3)" }} />

          {/* Sesion Ayuda  */}
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "4px 2px",
              marginTop: "3%",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Ayuda"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "4px 2px",
              marginBottom: "2%",
            }}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Accesos directos"
            />
          </ListItemButton>

          <Divider sx={{ background: "rgba(158, 172, 186, 0.3)" }} />

          {/* Cerrar Sesion  */}

          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "2px 2px",
              marginTop: "5%",
            }}
            onClick={onLogout}
          >
            <ListItemText
              sx={{ color: "rgb(158, 172, 186)" }}
              primary="Cerrar sesión"
            />
            <ListItemIcon sx={{ minWidth: "30px" }}>
              <LogoutOutlined
                sx={{ color: "rgb(158, 172, 186)", fontSize: "20px" }}
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
    </Modal>
  );
};
