import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import {
  clearErrors,
  getOrderDetail,
  updatedOrderAdmin,
} from "../../redux/actions/orderAction";
import Loader from "../../component/Loader";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { UPDATE_ORDER_RESET } from "../../redux/types";

const EditOrder = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = param;
  const { order, error, loading, isUpdated } = useSelector(
    (state) => state.order
  );
  const [status, setStatus] = useState("");
  const history = useHistory();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updatedOrderAdmin(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      history.push("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetail(id));
  }, [dispatch, id, alert, error, isUpdated, history]);

  return (
    <Layout title={`Orders Updated - ${id}`}>
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmOrderPage"
            style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div style={{ borderLeft: "none" }}>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order?.user?.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{order?.shippingInfo?.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.paymentInfo?.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.paymentInfo?.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>${order?.totalPrice}</span>
                  </div>
                </div>
                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order?.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order?.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {order?.orderItems?.map((item, i) => (
                    <div key={i}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ${item.price}
                        <b> = ${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "none" : "block",
                paddingLeft: "20px",
              }}
            >
              <Box
                component="form"
                encType="multipart/form-data"
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <Box sx={{ marginTop: "20px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="status"
                      name="status"
                      placeholder="status"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {order?.orderStatus === "Processing" && (
                        <MenuItem value="Shipped">Shipped</MenuItem>
                      )}
                      {order?.orderStatus === "Shipped" && (
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Process
                </Button>
              </Box>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditOrder;
