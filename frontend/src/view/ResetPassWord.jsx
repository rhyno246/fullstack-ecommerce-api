import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import Loader from "../component/Loader";
import { clearErrors, resetPassword } from "../redux/actions/userAction";

const ResetPassWord = () => {
  const { loading, error, success } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const param = useParams();
  const { token } = param;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, confirmPassword, password));
  };
  const history = useHistory();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password reset successfully");
      history.push("/login");
    }
  }, [error, dispatch, alert, history, success]);

  return (
    <Layout>
      <MetaData title="Ecommerce - ResetPassword" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", fontSize: "30px" }}
          >
            Reset Password
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
              label="Password"
              placeholder="password"
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="confirmPassword"
              placeholder="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset PassWord
            </Button>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default ResetPassWord;
