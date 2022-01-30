import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Layout from "../component/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../component/layout/MetaData";
import { clearErrors, login } from "../redux/actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../component/Loader";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const dispatch = useDispatch();

  const onchangeInputLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user.email, user.password));
    setUser("");
  };
  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [error, dispatch, alert, isAuthenticated, history, redirect]);

  return (
    <Layout>
      <MetaData title="Ecommerce - Login" noValidate sx={{ mt: 1 }} />
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center", fontSize: "30px" }}
            >
              Log In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onchangeInputLogin}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={onchangeInputLogin}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    to="/password/forgot"
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "12px",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "12px",
                    }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>{" "}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Login;
