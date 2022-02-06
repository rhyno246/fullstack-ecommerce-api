import React from "react";
import Layout from "./Layout";
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getUserDetails,
  updateUserAdmin,
} from "../../redux/actions/userAction";
import Loader from "../../component/Loader";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { UPDATE_USER_RESET } from "../../redux/types";
const UserDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const alert = useAlert();
  const history = useHistory();
  const { id } = param;
  const { error, userAdminDetail, loading, isUpdated } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUserAdmin(id, myForm));
  };

  useEffect(() => {
    if (userAdminDetail?.id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(userAdminDetail.name);
      setEmail(userAdminDetail.email);
      setRole(userAdminDetail.role);
    }
    if (error) {
      return alert.error(error);
    }
    if (isUpdated) {
      alert.success("Users Updated Successfully");
      history.push("/admin/users");
      dispatch(getUserDetails(id));
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    id,
    alert,
    error,
    isUpdated,
    userAdminDetail.id,
    userAdminDetail.name,
    userAdminDetail.email,
    userAdminDetail.role,
    history,
  ]);

  return (
    <Layout title={`Users - ${id}`}>
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <Box
            className="createProductForm"
            component="form"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

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
              name="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="role"
                name="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading ? true : false || role === "" ? true : false}
              sx={{ marginTop: 2 }}
            >
              Updated
            </Button>
          </Box>
        )}
      </div>
    </Layout>
  );
};

export default UserDetails;
