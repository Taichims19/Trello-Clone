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
          background: "rgb(143, 63, 101)",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          // className="animate__animated animate__fadeIn animate__faster"
        >
          <Header />
        </Grid>
        <Grid item lg={12} md={12} sx={{ display: "flex" }}>
          <Grid item lg={2} md={10} xs={2}>
            <Aside />
          </Grid>
          <Grid item lg={10} md={10} xs={10}>
            <Dashboard />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
