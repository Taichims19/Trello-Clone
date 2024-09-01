import { Grid, Typography } from "@mui/material";
import robotTrello from "../../assets/img/Robot-trello.png"; // Ajusta la ruta a tu imagen
import mountroTrello from "../../assets/img/mounstro-trello.png"; // Ajusta la ruta a tu imagen

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        // minHeight: "80vh",
        maxHeight: "100vh",
        background: "rgb(255, 255, 255)",
        padding: 4,
      }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: 440 },

          padding: 0,
          borderRadius: 3,
          zIndex: 2, // Asegúrate de que el zIndex sea mayor que el de las imágenes
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
      <Grid
        item
        style={{
          position: "absolute",
          top: "51%",
          width: "100%",
          display: "flex",

          zIndex: 1, // Menor que el formulario
          pointerEvents: "none", // Evita que este contenedor bloquee la interacción con el formulario
        }}
      >
        <img
          src={robotTrello}
          alt="Robot-Trello"
          style={{
            width: "400px",
            position: "relative",
            bottom: "42%",
            left: "0%",
          }}
        />
        <img
          src={mountroTrello}
          alt="Mountro-Trello"
          style={{
            width: "400px",
            height: "300px",
            top: "20%",
            position: "absolute",
            left: "75%",
          }}
        />
      </Grid>
    </Grid>
  );
};
