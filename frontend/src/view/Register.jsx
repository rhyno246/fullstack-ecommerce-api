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
import { Link, useHistory } from "react-router-dom";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { clearErrors, register } from "../redux/actions/userAction";
import { useAlert } from "react-alert";
import { imageUser } from "../redux/config/imgUser";
const Register = () => {
  const [avatar, setAvatar] = useState(imageUser);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const onchangeInputRegister = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const { name, email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const history = useHistory();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [error, dispatch, alert, isAuthenticated, history]);

  return (
    <Layout>
      <MetaData title="Ecommerce - SignUp" noValidate sx={{ mt: 1 }} />
      <Container>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", fontSize: "30px" }}
        >
          SignUp
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
            onChange={onchangeInputRegister}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            placeholder="email"
            name="email"
            value={email}
            onChange={onchangeInputRegister}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            placeholder="password"
            value={password}
            onChange={onchangeInputRegister}
          />
          <div
            className="fileupload"
            style={{ display: "flex", marginTop: "10px", alignItems: "center" }}
          >
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                accept="image/*"
                name="avatar"
                onChange={onchangeInputRegister}
              />
            </Button>
            <Avatar src={avatar} sx={{ marginLeft: "10px" }} />
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#000",
                fontSize: "12px",
                marginLeft: "10px",
              }}
            >
              Already have an account? Login.
            </Link>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading ? true : false}
          >
            SignUp
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
