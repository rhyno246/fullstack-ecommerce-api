import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  createNewProduct,
} from "../../redux/actions/productAction";
import { NEW_REVIEW_RESET } from "../../redux/types";
import Layout from "./Layout";

const AddNewProduct = () => {
  const categories = [
    "Laptop",
    "Camera",
    "SmartPhones",
    "PC",
    "Watch",
    "Tablet",
    "HeadPhone",
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const { loading, error, success } = useSelector((state) => state.products);
  const updateImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      price === "" ||
      description === "" ||
      category === "" ||
      stock === "" ||
      images.length === 0
    ) {
      alert.error("Feild is required");
      return;
    }
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((images) => {
      myForm.append("images", images);
    });
    dispatch(createNewProduct(myForm));
  };
  const history = useHistory();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/products");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  return (
    <Layout title="Add New Product">
      <Box
        component="form"
        encType="multipart/form-data"
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
          label="Price"
          name="price"
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="stock"
          name="stock"
          type="number"
          placeholder="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
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
              multiple
            />
          </Button>
          <div className="create-new-product">
            {images?.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>
        </div>

        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel id="demo-simple-select-label">category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={20}
          style={{ width: "100%", marginTop: "20px", padding: "8px" }}
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading ? true : false}
          sx={{ marginTop: 2 }}
        >
          Create
        </Button>
      </Box>
    </Layout>
  );
};

export default AddNewProduct;
