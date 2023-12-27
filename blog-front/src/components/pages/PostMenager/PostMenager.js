import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  FilledInput,
  IconButton,
  Input,
  MenuItem,
  Paper,
  Select,
  Tab,
  TabScrollButton,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DrawIcon from "@mui/icons-material/Draw";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DoneIcon from "@mui/icons-material/Done";
import { PickersToolbarButton } from "@mui/x-date-pickers/internals";
import { NewPostDialog } from "../../ui/NewPost";
import WaitingPosts from "./WaitingPosts/WaitingPosts";
import ApprovedPosts from "./ApprovedPosts/ApprovedPosts";
import DraftPosts from "./DraftPosts/DraftPosts";
import ApprovedPostsWrapper from "../../wrappers/PostMenager/ApprovedPostsWarapper";
import DraftPostsWrapper from "../../wrappers/PostMenager/DraftPostsWrapper";
import WaitingForApprovalWrapper from "../../wrappers/PostMenager/WaitingForApprovalWrapper";
import usePostManager from "../../hooks/usePostManager";

export default function PostMenager() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [newDialog, setNewDialog] = useState(false);

  return (
    <TabContext value={value}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          alignItems: "center",
        }}
      >
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab
            icon={<DoneIcon />}
            iconPosition="start"
            label="Approved posts"
            value="1"
          />
          <Tab
            label="Draft posts"
            value="2"
            icon={<DrawIcon />}
            iconPosition="start"
          />
          <Tab
            label="Waiting for approval"
            value="3"
            icon={<HourglassBottomIcon />}
            iconPosition="start"
          />
        </TabList>
        <IconButton
          color="success"
          onClick={() => {
            setNewDialog(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TabPanel value="1">
        <ApprovedPostsWrapper />
      </TabPanel>
      <TabPanel value="2">
        <DraftPostsWrapper />
      </TabPanel>
      <TabPanel value="3">
        <WaitingForApprovalWrapper />
      </TabPanel>
      <NewPostDialog open={newDialog} setOpen={setNewDialog} />
    </TabContext>
  );
}
