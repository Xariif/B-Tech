import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Paper,
  TextField,
  Typography,
  styled,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { BluetoothDisabled, ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
import useService from "../../../services/posts/useService";
import { useNotification } from "../../hooks/useNotification";
import useError from "../../hooks/useError";
import usePostMenager from "../../hooks/usePostMenager";

export default function Edit({ post, editDialogOpen, setEditDialogOpen }) {
  const postsService = useService();
  const notification = useNotification();

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const [title, setTitle] = useState(post.title ?? "");
  const [category, setCategory] = useState(post.category ?? "");
  const [tags, setTags] = useState(post.tags ?? []);
  const [content, setContent] = useState(post.content ?? "");
  const { fetchWaitingPosts, fetchDraftPosts } = usePostMenager();

  const [file, setFile] = useState(null);
  const { handleError } = useError();

  useEffect(() => {
    const getImageFromBlob = (blob) => {
      return fetch(blob)
        .then((res) => res.blob())
        .then((x) => {
          setFile(new File([x], post?.imageInfo?.name, { type: "image/jpeg" }));
        });
    };

    if (post.image) {
      getImageFromBlob(post?.image);
    }
  }, []);

  const categories = [
    {
      value: 1,
      name: "CARS",
    },
    {
      value: 2,
      name: "TECH",
    },
    {
      value: 3,
      name: "BUSINESS",
    },
    {
      value: 4,
      name: "FINANCE",
    },
    {
      value: 5,
      name: "HEALTH",
    },
    {
      value: 6,
      name: "FITNESS",
    },
    {
      value: 7,
      name: "FILESTYLE",
    },
    {
      value: 8,
      name: "TRAVEL",
    },
    {
      value: 9,
      name: "FOOD",
    },
    {
      value: 10,
      name: "FASHION",
    },
    {
      value: 11,
      name: "ENTERTEINMENT",
    },
    {
      value: 12,
      name: "EDUCATION",
    },
    {
      value: 13,
      name: "NATURE",
    },
    {
      value: 14,
      name: "SPORT",
    },
    {
      value: 15,
      name: "OTHER",
    },
  ];

  const chceckIfSubmitButtonShouldBeDisabled = () => {
    if (
      title.length > 0 &&
      category !== "" &&
      //   tags.length > 0 &&
      content.length > 0 &&
      file != null
    ) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  useEffect(() => {
    chceckIfSubmitButtonShouldBeDisabled();
    if (title.trim().length > 0) setSaveButtonDisabled(false);
    else setSaveButtonDisabled(true);
  }, [title, category, tags, content, file]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Dialog
      open={editDialogOpen}
      onClose={() => setEditDialogOpen()}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Edit post</DialogTitle>

      <Paper sx={{ p: 2 }}>
        <TextField
          type="text"
          label="Title"
          fullWidth
          sx={{ mt: 2 }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value.trimStart());
          }}
        />

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="headerImage"
            style={{
              objectFit: "cover",
              verticalAlign: "top",
              height: "280px",
              width: "100%",
              marginTop: "1rem",
            }}
          />
        )}

        <Box sx={{ mt: 2, display: "flex" }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mr: 2, width: "-webkit-fill-available" }}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple={false}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </Button>
          <TextField
            value={file?.name ?? "No file selected"}
            disabled
            sx={{ width: "-webkit-fill-available" }}
          />
        </Box>
        <TextField
          select
          label="Category"
          defaultValue={category}
          fullWidth
          sx={{ mt: 2 }}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((option) => {
            return (
              <MenuItem key={option.value} value={option.name}>
                {option.name}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          minRows={10}
          fullWidth
          sx={{ mt: 2 }}
          value={content}
          onChange={(e) => {
            if (e.target.value.length > 10000) return;

            setContent((prev) => e.target.value);
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            endIcon={<SaveIcon />}
            disabled={saveButtonDisabled}
            onClick={() => {
              notification.setLoader(true);
              postsService
                .UpdateDraftPost({
                  Id: post.id,
                  MainParentId: post.mainParentId,
                  Title: title,
                  Category: category,
                  Tags: tags,
                  Content: content,
                  MainImage: file,
                })
                .catch((err) => {
                  handleError(err);
                })
                .finally(() => {
                  notification.setLoader(false);
                  setEditDialogOpen();
                  fetchDraftPosts();
                });
            }}
          >
            Update draft
          </Button>

          <Button
            variant="contained"
            disabled={submitButtonDisabled}
            endIcon={<CloudUploadIcon />}
            onClick={() => {
              notification.setLoader(true);
              postsService
                .CreatePost({
                  Title: title,
                  Category: category,
                  Tags: tags,
                  Content: content,
                  MainImage: file,
                })
                .then(() => {
                  postsService.DeletePost({ id: post.id }).then(() => {
                    fetchDraftPosts();
                    fetchWaitingPosts();
                  });
                })
                .then(() => {})
                .then(() => {
                  setTitle("");
                  setCategory("");
                  // setTags([]);
                  setContent("");
                  setFile(null);
                })
                .catch((err) => {
                  handleError(err);
                })
                .finally(() => {
                  notification.showToast("Post sended to approval", "success");
                  notification.setLoader(false);
                  setEditDialogOpen(false);
                });
            }}
          >
            Send to Approval
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}
