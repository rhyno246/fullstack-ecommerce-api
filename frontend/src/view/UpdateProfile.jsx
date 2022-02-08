import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { useAlert } from "react-alert";
import { clearErrors, loadUser, updateUser } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../redux/types";
import Loader from "../component/Loader";

const UpdateProfile = () => {
  const { users, isUpdated, error, loading } = useSelector(
    (state) => state.user
  );
  const [avatar, setAvatar] = useState("");
  const [imgReview, setImgReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const updateImage = (e) => {
    const reader = new FileReader();
    setImgReview("")
    setAvatar("")
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUser(myForm));
  };
  const history = useHistory();
  useEffect(() => {
    if (users) {
      setName(users?.name);
      setEmail(users?.email);
      setImgReview(users?.avatar);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history.push("/profile");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [error, dispatch, alert, isUpdated, history, users]);
  return (
    <Layout>
      <MetaData title="Profile - Updated" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", fontSize: "30px" }}
          >
            Update Profile
          </Typography>
          <Box
            component="form"
            encType="multipart/form-data"
            sx={{ maxWidth: "400px", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              className="fileupload"
              style={{
                display: "flex",
                marginTop: "10px",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="avatar"
                  onChange={updateImage}
                />
              </Button>
              { imgReview && <Avatar src={imgReview?.url} sx={{ marginLeft: "10px" }} /> }
              { avatar && <Avatar src={avatar} sx={{ marginLeft: "10px" }} /> }
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default UpdateProfile;
