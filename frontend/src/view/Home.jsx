import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import ProductItem from "../component/ProductItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import MetaData from "../component/layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllProduct } from "../redux/actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../component/Loader";
import { getAllSlider } from "../redux/actions/bannerAction";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const { sliders } = useSelector((state) => state.banner);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProduct());
    dispatch(getAllSlider());
  }, [dispatch, alert, error]);

  const onSlideChangeBanner = (item) => {
    setIndex(item.activeIndex);
  };

  return (
    <Layout>
      <MetaData title="Ecommerce - Home" />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Box className="slider" sx={{ marginBottom: 2 }}>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
              style={{
                "--swiper-navigation-color": "#ddd",
                "--swiper-pagination-color": "#ddd",
              }}
              onSlideChange={(item) => onSlideChangeBanner(item)}
            >
              {sliders?.map((item, i) => (
                <SwiperSlide key={i}>
                  <img src={item?.image?.url} alt={item.heading} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="wrapper-mini-slide">
              {sliders?.map((item, i) => (
                <div
                  className={`box-slider ${
                    index === i ? "active-small-slide" : ""
                  }`}
                  key={i}
                >
                  <h3 className="heading">{item.heading}</h3>
                  <p className="description">{item.description}</p>
                </div>
              ))}
            </div>
          </Box>
          {products?.length ? (
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 2, md: 2 }}
              >
                {products?.map((item, i) => (
                  <ProductItem key={i} product={item} />
                ))}
              </Grid>
            </Box>
          ) : (
            <div className="product-notfound">Cannot find product</div>
          )}
        </Container>
      )}
    </Layout>
  );
};

export default Home;
