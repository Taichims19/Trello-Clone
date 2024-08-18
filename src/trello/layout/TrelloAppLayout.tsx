import React from "react";
import { Grid } from "@mui/material";

import Dashboard from "../components/Dashboard";
import Aside from "../components/Aside";
import Header from "../components/Header";

export const TrelloAppLayout = () => {
  return (
    <>
      <Grid
        container
        sx={{
          // backgroundColor: "rgba(248, 248, 255,1)",
          backgroundColor: "red",
          width: "100%",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Header />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={2}>
            <Aside />
          </Grid>
          <Grid item xs={10}>
            <Dashboard />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
