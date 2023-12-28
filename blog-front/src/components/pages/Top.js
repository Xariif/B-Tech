import React, { useState, useEffect } from "react";

import { Box, Button, Grid, Paper, Popover, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Popper from "@mui/material/Popper";
import { useNotification } from "../hooks/useNotification";
import PostSmallImg from "../ui/PostSmallImg";

export default function Top({ ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { setFrom, setTo } = props;

  const today = new Date();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            setFrom(new Date(today.getTime() - 24 * 60 * 60 * 1000));
          }}
        >
          24h
        </Button>
        <Button
          onClick={() => {
            setFrom(new Date(today.getTime() - 48 * 60 * 60 * 1000));
          }}
        >
          48h
        </Button>

        <Button
          onClick={() => {
            setFrom(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000));
          }}
        >
          7 days
        </Button>
        <Button
          onClick={() => {
            setFrom(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000));
          }}
        >
          1 month
        </Button>
        <Button aria-describedby={id} onClick={handleClick}>
          Calendar
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
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
          </Paper>{" "}
        </Popover>
      </Box>

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
                  <PostSmallImg post={post} link />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
