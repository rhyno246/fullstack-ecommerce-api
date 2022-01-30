import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../redux/actions/orderAction";
import { getOrderDetail } from "../redux/actions/orderAction";
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
const OrderDetail = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.order);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetail(id));
  }, [dispatch, alert, error, id]);
  return (
    <Layout>
      <MetaData title="Order Details" />
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">Order #{order?._id}</Typography>
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
                    {`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pinCode}, ${order?.shippingInfo?.country}`}
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
                  <span>{order?.totalPrice}</span>
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

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems?.map((item, i) => (
                  <div key={i}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ${item.price} =
                      <b> ${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default OrderDetail;
