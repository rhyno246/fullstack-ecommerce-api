import { Button, Container, TextField, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createAdminContact } from "../redux/actions/contactAction";
import { CREATE_CONTACT_RESET } from "../redux/types";
import { clearErrors } from "../redux/actions/contactAction";
import { useHistory } from "react-router-dom";
const Contact = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState({
    name: "",
    email: "",
    phone: "",
    nodeted: "",
  });
  const { loading, error, success } = useSelector((state) => state.contact);
  const onchangeInputRegister = (e) => {
    setContacts({ ...contacts, [e.target.name]: e.target.value });
  };
  const { name, email, phone, nodeted } = contacts;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || nodeted === "") {
      alert.error("Feild is required");
      return;
    }
    dispatch(createAdminContact(contacts));
  };
  const history = useHistory();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      history.push("/");
      alert.success("Submit Successfully");
      dispatch({ type: CREATE_CONTACT_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  return (
    <Layout>
      <MetaData title="Ecommerce - Contact" />
      <Container>
        <Box
          component="form"
          sx={{ maxWidth: "700px", margin: "0 auto" }}
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
            name="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={onchangeInputRegister}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Phone"
            name="phone"
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={onchangeInputRegister}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Nodeted"
            name="nodeted"
            value={nodeted}
            style={{ width: "97%", marginTop: "10px", padding: "8px" }}
            onChange={onchangeInputRegister}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading ? true : false}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Contact;
