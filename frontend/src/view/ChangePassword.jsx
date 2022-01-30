import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import Loader from "../component/Loader";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../redux/types";

const ChangePassword = () => {
  const { isUpdated, error, loading } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onchangeInputPasswordUpdated = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const alert = useAlert();
  const dispatch = useDispatch();
  const { oldPassword, newPassword, confirmPassword } = user;
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  const history = useHistory();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      dispatch(loadUser());
      history.push("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, dispatch, alert, isUpdated, history]);
  return (
    <Layout>
      <MetaData title="Profile - ChangePassword" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", fontSize: "30px" }}
          >
            Update Password
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
              name="oldPassword"
              label="oldPassword"
              type="password"
              placeholder="oldPassword"
              value={oldPassword}
              onChange={onchangeInputPasswordUpdated}
            />
            <TextField
              margin="normal"
              fullWidth
              name="newPassword"
              label="newPassword"
              type="password"
              placeholder="newPassword"
              value={newPassword}
              onChange={onchangeInputPasswordUpdated}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={onchangeInputPasswordUpdated}
            />
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

export default ChangePassword;
