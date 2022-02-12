import { Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CheckoutSteps from "../component/CheckoutSteps";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { getStripleKey } from "../redux/actions/orderAction";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { users } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.order);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 20;

  const tax = subtotal * 0.1;

  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const history = useHistory();

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    localStorage.setItem("orderInfo", JSON.stringify(data));
    dispatch(getStripleKey());
    history.push("/process/payment");
  };
  return (
    <Layout>
      <MetaData title="Confirm order" />
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Confirm Order
      </Typography>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{users?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item, i) => (
                  <div key={i}>
                    <img
                      src={item.image}
                      alt={i}
                      style={{ objectFit: "cover" }}
                    />
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>${subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>${tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>

            <button
              onClick={proceedToPayment}
              disabled={loading ? true : false}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;
