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
import { ConstructionOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import WaitingPosts from "./WaitingPosts/WaitingPosts";
import ApprovedPosts from "./ApprovedPosts/ApprovedPosts";
import DraftPosts from "./DraftPosts/DraftPosts";
import ApprovedPostsWrapper from "../../wrappers/PostMenager/ApprovedPostsWarapper";
import DraftPostsWrapper from "../../wrappers/PostMenager/DraftPostsWrapper";
import WaitingForApprovalWrapper from "../../wrappers/PostMenager/WaitingForApprovalWrapper";
import New from "../../ui/PostDialog/New";

export default function PostMenager({ content }) {
  const url = window.location.pathname;
  const segments = url.split("/");
  const lastWord = segments.pop() || segments.pop();

  const [value, setValue] = useState("approved");

  useEffect(() => {
    setValue(lastWord);
  }, [lastWord]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <TabContext value={value}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab
            icon={<DoneIcon />}
            iconPosition="start"
            label="Approved posts"
            value="approved"
            onClick={() => {
              navigate("./approved", { replace: false });
            }}
          />
          <Tab
            label="Draft posts"
            value="draft"
            icon={<DrawIcon />}
            iconPosition="start"
            onClick={() => {
              navigate("./draft ", { replace: false });
            }}
          />
          <Tab
            label="Waiting for approval"
            value="waiting"
            icon={<HourglassBottomIcon />}
            iconPosition="start"
            onClick={() => {
              navigate("./waiting", { replace: false });
            }}
          />
        </TabList>
        <IconButton
          color="success"
          onClick={() => {
            setNewDialogOpen(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {content}
      <New newDialogOpen={newDialogOpen} setNewDialogOpen={setNewDialogOpen} />
    </TabContext>
  );
}
