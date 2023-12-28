import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Avatar,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deepOrange, red } from "@mui/material/colors";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useUserService from "../../services/users/useService";
import useError from "../hooks/useError";
import { useNotification } from "../hooks/useNotification";
import useAuthorService from "../../services/author/useService";
import usePostService from "../../services/posts/useService";

function Profile() {
  const { isAuthenticated, logout } = useAuth0();

  const userService = useUserService();
  const postService = usePostService();
  const { handleError } = useError();
  const { showToast } = useNotification();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState();

  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const notification = useNotification();

  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    await userService
      .GetUserData()
      .then((res) => {
        setData(res);
        setName(res.name || "");
        setSurname(res.surname || "");
        setPhone(res.phone || "");
        setEmail(res.email || "");
        return res;
      })
      .then((r) => {
        if (r.avatarId)
          userService.GetAvatar({ id: r.avatarId }).then((res) => {
            setAvatarUrl(res);
          });
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = () => {
    if (phone.toString().length === 9 || phone.toString().length !== 0) {
      showToast("Phone number must be 9 digits", "error");
      return;
    }

    userService
      .UpdateUser({ name, surname, phone, email, avatar })
      .then(() => {
        fetchData();
      })
      .then(() => {
        showToast("User info updated", "success");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        notification.showToast("User info updated", "success");
      });
  };

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

  if (data === undefined) return null;

  return (
    <Paper style={{ padding: "1em" }}>
      <Box
        width="100%"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Profile </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1 }}>
            <IconButton component="label" variant="outlined">
              <CloudUploadIcon />
              <VisuallyHiddenInput
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple={false}
                onChange={(e) => {
                  const file = e.target.files[0];

                  setAvatar(file);
                  setAvatarUrl(URL.createObjectURL(file));
                }}
              />
            </IconButton>
          </Box>
          <Avatar
            src={avatarUrl}
            sx={{
              width: 56,
              height: 56,
              fontWeight: "bold",
            }}
          >
            {name[0] + surname[0]}
          </Avatar>
        </Box>
      </Box>
      <Box>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value.trim())}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
      {data?.id && <AuthorSettings data={data} />}
      <Box mt={2}>
        <Typography variant="h2" style={{ color: red[400] }}>
          Danger Zone
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="error"
            onClick={() => setDialogOpen(true)}
          >
            Delete Account
          </Button>
        </Box>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <DialogTitle color={red[500]}>DELETE ACCOUNT</DialogTitle>
          <DialogContent>
            <DialogContentText
              variant="h6"
              color={red}
              gutterBottom
              textAlign="center"
            >
              Are you sure you want to delete your account?
              <br />
              This action is irreversible.
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={() => {
                  userService
                    .DeleteUser()
                    .then(() => {
                      logout({
                        logoutParams: {
                          returnTo: window.location.origin,
                        },
                      });
                    })
                    .catch((err) => {
                      handleError(err);
                    });
                }}
              >
                Yes
              </Button>
              <Button onClick={() => setDialogOpen(false)}>No</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </Paper>
  );
}

export default Profile;

function AuthorSettings({ data }) {
  const [authorData, setAuthorData] = useState();
  const notification = useNotification();

  const authorService = useAuthorService();
  const { handleError } = useError();
  useEffect(() => {
    authorService
      .GetAuthorByUserId({ id: data.id })
      .then((res) => {
        setAuthorData(res);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [data]);

  if (!authorData) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h2">Author Settings</Typography>
      <TextField
        label="Description"
        multiline
        rows={15}
        fullWidth
        value={authorData.description || ""}
        onChange={(e) =>
          setAuthorData({ ...authorData, description: e.target.value })
        }
      />
      <Typography variant="h6" mt={1}>
        Social Media
      </Typography>
      <TextField
        sx={{ mt: 2 }}
        label="Facebook"
        fullWidth
        value={authorData.socialMedia.facebook || ""}
        onChange={(e) =>
          setAuthorData({
            ...authorData,
            socialMedia: {
              ...authorData.socialMedia,
              facebook: e.target.value,
            },
          })
        }
      />
      <TextField
        sx={{ mt: 2 }}
        label="Instagram"
        fullWidth
        value={authorData.socialMedia.instagram || ""}
        onChange={(e) =>
          setAuthorData({
            ...authorData,
            socialMedia: {
              ...authorData.socialMedia,
              instagram: e.target.value,
            },
          })
        }
      />
      <TextField
        sx={{ mt: 2 }}
        label="Twitter"
        fullWidth
        value={authorData.socialMedia.twitter || ""}
        onChange={(e) =>
          setAuthorData({
            ...authorData,
            socialMedia: {
              ...authorData.socialMedia,
              twitter: e.target.value,
            },
          })
        }
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={() => {
            authorService
              .UpdateAuthor({
                description: authorData.description,
                socialMedia: authorData.socialMedia,
              })
              .then(() => {
                notification.showToast("Author info updated", "success");
              })
              .catch((err) => {
                handleError(err);
              });
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
