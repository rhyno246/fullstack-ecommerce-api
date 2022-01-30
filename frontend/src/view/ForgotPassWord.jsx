import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import Loader from "../component/Loader";
import { clearErrors, forgotPassword } from "../redux/actions/userAction";
import { FORGOT_PASSWORD_RESET } from "../redux/types";

const ForgotPassWord = () => {
  const { loading, error, message } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      dispatch({
        type: FORGOT_PASSWORD_RESET,
      });
    }
    if (message) {
      alert.success(message);
    }
  }, [error, dispatch, alert, message]);

  return (
    <Layout>
      <MetaData title="Ecommerce - ForgotPassword" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", fontSize: "30px" }}
          >
            Forgot Password
          </Typography>
          <Box
            component="form"
            sx={{ maxWidth: "400px", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default ForgotPassWord;
