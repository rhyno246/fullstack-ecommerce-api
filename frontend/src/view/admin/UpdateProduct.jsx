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
import { useHistory, useParams } from "react-router-dom";
import {
  updatedProduct,
  getProductDetail,
} from "../../redux/actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../redux/types";
import Layout from "./Layout";
import Loader from "../../component/Loader";

const UpdateProduct = () => {
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
  const history = useHistory();
  const param = useParams();
  const { id } = param;
  const { loading, error, isUpdated, product } = useSelector(
    (state) => state.products
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    if (product?.id !== id) {
      dispatch(getProductDetail(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [
    dispatch,
    error,
    alert,
    history,
    isUpdated,
    id,
    product.name,
    product.id,
    product.description,
    product.price,
    product.category,
    product.stock,
    product.images,
  ]);

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
    dispatch(updatedProduct(id, myForm));
  };

  console.log(product);
  return (
    <Layout title={`Update - ${product?.name}`}>
      {loading ? (
        <Loader />
      ) : (
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
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>
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
            Updated
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default UpdateProduct;
