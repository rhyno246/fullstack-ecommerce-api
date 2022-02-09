import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  createAdminSlider,
} from "../../redux/actions/bannerAction";
import { CREATE_SLIDER_RESET } from "../../redux/types";
import { useHistory } from "react-router-dom";

const AddNewSlider = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector((state) => state.banner);

  const updateImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (heading === "" || description === "" || image === "") {
      alert.error("Feild is required");
      return;
    }
    const myForm = new FormData();
    myForm.set("heading", heading);
    myForm.set("image", image);
    myForm.set("description", description);
    dispatch(createAdminSlider(myForm));
  };

  const history = useHistory();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Sliders Created Successfully");
      history.push("/admin/slider");
      dispatch({ type: CREATE_SLIDER_RESET });
    }
  }, [dispatch, error, success, history, alert]);

  return (
    <Layout title="Slider - Add New">
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Heading"
          name="heading"
          type="text"
          placeholder="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Description"
          name="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
              name="images"
              onChange={updateImage}
            />
          </Button>
          <div className="create-new-product">
            {image && <img src={image} alt="Product Preview" />}
          </div>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading ? true : false}
          sx={{ marginTop: 2 }}
        >
          Add new
        </Button>
      </Box>
    </Layout>
  );
};

export default AddNewSlider;
