import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Grid, Box } from "@mui/material";
import DayColumn from "./DayColumn";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Dashboard: React.FC = () => {
  const tasksByDay = useSelector((state: any) => state.trello.tasksByDay);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container sx={{ height: "100vh" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
            background: "rgb(143, 63, 101)",
          }}
        >
          {daysOfWeek.map((day) => (
            <DayColumn key={uuidv4()} day={day} tasks={tasksByDay[day]} />
          ))}
        </Box>
      </Grid>
    </DndProvider>
  );
};

export default Dashboard;
