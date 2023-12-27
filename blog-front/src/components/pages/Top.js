import React, { useState, useEffect } from "react";

import { Box, Button, Grid, Paper } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNotification } from "../hooks/useNotification";
import PostSmallImg from "../ui/PostSmallImg";

export default function Top({ ...props }) {
  console.log(props);
  return (
    <Box>
      <Paper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>From date:</h1>
              <DateCalendar
                value={dayjs(props.from)}
                disableHighlightToday
                maxDate={dayjs(props.to)}
                onChange={(e) => {
                  props.setFrom(e.$d);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>To date:</h1>
              <DateCalendar
                value={dayjs(props.to)}
                disableHighlightToday
                minDate={dayjs(props.from).add(1, "day")}
                maxDate={dayjs()}
                onChange={(e) => {
                  props.setTo(e.$d);
                }}
              />
            </div>
          </Box>
        </LocalizationProvider>
      </Paper>

      {props.posts && (
        <Box sx={{ pt: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, sm: 4, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {props.posts?.map((post) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={post.id}>
                  <PostSmallImg post={post} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
