import React, { useEffect, useRef } from "react";
import MetaData from "../component/layout/MetaData";
import { Typography } from "@mui/material";
import Layout from "../component/layout/Layout";
import CheckoutSteps from "../component/CheckoutSteps";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../redux/config/axiosConfig";
import { useHistory } from "react-router-dom";
import { clearErrors, createOrder } from "../redux/actions/orderAction";
const Payment = () => {
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
  const { error } = useSelector((state) => state.order);
  const payBtn = useRef(null);
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { users } = useSelector((state) => state.user);
  const history = useHistory();
  const paymentData = {
    amount: orderInfo.totalPrice,
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const data = await axiosConfig.post("/payment/process", paymentData);
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: users.name,
            email: users.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Layout>
      <MetaData title="Payment" />
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Payment
      </Typography>
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - $${orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Layout>
  );
};

export default Payment;
