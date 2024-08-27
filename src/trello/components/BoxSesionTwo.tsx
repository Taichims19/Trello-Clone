import React from "react";

import Divider from "@mui/material/Divider";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const BoxSesionTwo = ({ open, handleClose }) => {
  const { displayName, email } = useSelector((state: RootState) => state.auth);

  const getInitials = (name: string): string => {
    const names = name.split(" ");
    return names
      .map((name) => name[0].toUpperCase()) // Convertimos a mayúsculas la primera letra
      .join(" ");
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
          top: "40%",
          left: "85%",
          transform: "translate(-50%, -50%)",
          width: "20%",
          height: "30%",
          borderRadius: 4,
          background: "rgb(40, 46, 51)",

          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,

          margin: "20px",
        }}
      >
        {/* botones */}
        <List>
          {/* sesion cuenta  */}
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "47%",
              background: "rgb(87, 157, 255)",
              paddingTop: 4,
              borderRadius: 2,
              paddingBottom: "-9px",
              marginTop: 0,
            }}
          >
            {/* Muestra el nombre del usuario aquí */}
            {displayName && (
              <Button
                sx={{
                  display: "flex",
                  position: "relative",
                  left: "6%",
                  justifyItems: "center",
                  alignItems: "center",
                  fontSize: "38px",
                  minWidth: "95px",
                  height: "95px",
                  marginRight: "10%",
                  paddingTop: "2px",
                  letterSpacing: "-5px",
                  lineHeight: 0,
                  background: "rgba(0, 82, 204, 1)",
                  color: "white",
                  borderRadius: 12,
                  fontWeight: 700,
                  border: "1px solid #ccc",
                }}
              >
                {getInitials(displayName)}
              </Button>
            )}
            <Box
              sx={{
                position: "relative",
                left: "0%",
                top: 3,
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  marginLeft: "3%",
                  color: "rgb(37, 50, 67)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {displayName}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "3%",
                  color: "rgb(37, 50, 67)",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              top: "22%",
            }}
          >
            <ListItemButton
              sx={{
                color: "rgb(158, 172, 186)",
                textTransform: "none",
                padding: "0px 16px",
                marginBottom: "2%",
              }}
            >
              <ListItemText
                sx={{
                  color: "rgb(158, 172, 186)",
                }}
                primary="Editar informacion de perfil"
              />
            </ListItemButton>

            <Divider
              sx={{
                display: "flex",
                position: "relative",
                left: "5%",
                background: "rgb(158, 172, 186)",
                width: "90%",
              }}
            />

            <ListItemButton
              sx={{
                color: "rgb(158, 172, 186)",
                textTransform: "none",
                padding: "2px 16px",
              }}
            >
              <ListItemText
                sx={{ color: "rgb(158, 172, 186)", marginTop: "3%" }}
                primary="Ver actividad de tablero de un miembro"
              />
            </ListItemButton>
          </Box>
        </List>
      </Box>
    </Modal>
  );
};
