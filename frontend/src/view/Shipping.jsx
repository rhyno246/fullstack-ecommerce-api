import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../component/CheckoutSteps";
import { saveShippingInfo } from "../redux/actions/cartAction";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });
  const { address, city, state, country, pinCode, phoneNo } = shipping;
  const onchangeInputShipping = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      phoneNo === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      pinCode === ""
    ) {
      alert.error("Feild is required");
      return;
    }
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <Layout>
      <MetaData title="Ecommerce - Shipping" />
      <Container>
        <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
          Shipping Details
        </Typography>
        <CheckoutSteps activeStep={0} />
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            fullWidth
            label="address"
            name="address"
            type="text"
            placeholder="address"
            value={address}
            onChange={onchangeInputShipping}
          />
          <TextField
            margin="normal"
            fullWidth
            label="city"
            name="city"
            type="text"
            placeholder="city"
            value={city}
            onChange={onchangeInputShipping}
          />
          <TextField
            margin="normal"
            fullWidth
            label="pinCode"
            name="pinCode"
            type="number"
            placeholder="pinCode"
            value={pinCode}
            onChange={onchangeInputShipping}
          />
          <TextField
            margin="normal"
            fullWidth
            label="phoneNo"
            name="phoneNo"
            type="number"
            placeholder="phoneNo"
            value={phoneNo}
            onChange={onchangeInputShipping}
          />
          <Box sx={{ marginTop: "20px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                label="country"
                name="country"
                onChange={onchangeInputShipping}
              >
                {Country?.getAllCountries().map((item) => (
                  <MenuItem key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {country && (
            <Box sx={{ marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">state</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="state"
                  name="state"
                  onChange={onchangeInputShipping}
                >
                  {State?.getStatesOfCountry(country).map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Shipping;
