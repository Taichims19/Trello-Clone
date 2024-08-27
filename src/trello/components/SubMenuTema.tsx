import React, { useState } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  Modal,
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness6Icon from "@mui/icons-material/Brightness6";

export const SubMenuTema = ({ open2, handleClose2 }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <Modal
      open={open2}
      onClose={handleClose2}
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
          top: "75%",
          left: "65.7%",
          transform: "translate(-50%, -50%)",
          width: "15%",
          height: "30%",
          borderRadius: 3,
          background: "rgb(40, 46, 51)",
          boxShadow: 24,
        }}
      >
        <List
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "12px",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "0px 16px",
              marginBottom: "2%",
              width: "100%",
            }}
            onClick={handleClose2}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              sx={{
                color: "rgb(158, 172, 186)",
                "&.Mui-checked": {
                  color: "rgb(158, 172, 186)",
                },
              }}
            />
            <Brightness7Icon
              sx={{
                marginLeft: "10px",
                color: "rgb(243, 159, 24)",
                width: "60px",
                height: "60px",
              }}
            />
            <ListItemText
              sx={{
                marginLeft: "4%",
                color: "rgb(158, 172, 186)",
              }}
              primary="luz"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "0px 16px",
              marginBottom: "2%",
              width: "100%",
            }}
            onClick={handleClose2}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              sx={{
                color: "rgb(158, 172, 186)",
                "&.Mui-checked": {
                  color: "rgb(158, 172, 186)",
                },
              }}
            />
            <Brightness4OutlinedIcon
              sx={{
                marginLeft: "10px",
                color: "rgb(72, 62, 245)",
                width: "60px",
                height: "60px",
              }}
            />
            <ListItemText
              sx={{
                color: "rgb(158, 172, 186)",
              }}
              primary="Oscuro"
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              color: "rgb(158, 172, 186)",
              textTransform: "none",
              padding: "0px 16px",
              marginBottom: "2%",
              width: "100%",
            }}
            onClick={handleClose2}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              sx={{
                color: "rgb(158, 172, 186)",
                "&.Mui-checked": {
                  color: "rgb(158, 172, 186)",
                },
              }}
            />
            <Brightness6Icon
              sx={{
                marginLeft: "10px",
                color: "rgb(158, 172, 186)",
                width: "60px",
                height: "60px",
              }}
            />
            <ListItemText
              sx={{
                color: "rgb(158, 172, 186)",
              }}
              primary="Igual que el navegador "
            />
          </ListItemButton>
        </List>
      </Box>
    </Modal>
  );
};
