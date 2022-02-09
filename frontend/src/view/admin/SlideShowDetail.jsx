import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getAdminSliderDetail,
  updateAdminSlider,
} from "../../redux/actions/bannerAction";
import { UPDATE_SLIDER_RESET } from "../../redux/types";
import Layout from "./Layout";

const SlideShowDetail = () => {
  const param = useParams();
  const { id } = param;
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageReview, setImgReview] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, isUpdated, slider } = useSelector(
    (state) => state.banner
  );
  const updateImage = (e) => {
    const reader = new FileReader();
    setImgReview("");
    setImage("");
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (heading === "" || description === "") {
      alert.error("Feild is required");
      return;
    }
    const myForm = new FormData();
    myForm.set("heading", heading);
    myForm.set("image", image);
    myForm.set("description", description);
    dispatch(updateAdminSlider(id, myForm));
  };
  const history = useHistory();
  useEffect(() => {
    if (slider?.id !== id) {
      dispatch(getAdminSliderDetail(id));
    } else {
      setHeading(slider.heading);
      setDescription(slider.description);
      setImgReview(slider.image);
    }
    if (error) {
      return alert.error(error);
    }
    if (isUpdated) {
      alert.success("Slider Updated Successfully");
      history.push("/admin/slider");
      dispatch(getAdminSliderDetail(id));
      dispatch({ type: UPDATE_SLIDER_RESET });
    }
  }, [dispatch, id, slider, alert, history, error, isUpdated]);

  return (
    <Layout title={`Slider - ${id}`}>
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
            {imageReview && (
              <img src={imageReview.url} alt="Old Product Preview" />
            )}
          </div>
          <div className="create-new-product">
            {image && <img src={image} alt="Product Preview" />}
          </div>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={loading ? true : false}
        >
          Updated
        </Button>
      </Box>
    </Layout>
  );
};

export default SlideShowDetail;
