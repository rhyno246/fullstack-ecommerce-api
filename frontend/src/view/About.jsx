import { Container, Grid } from "@mui/material";
import React from "react";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import MainImage from "../component/assets/about-header-bg.jpg";
import img2 from "../component/assets/img-2.jpg";
import member1 from "../component/assets/member-1.jpg";
import member2 from "../component/assets/member-2.jpg";
import member3 from "../component/assets/member-3.jpg";

const About = () => {
  const member = [
    {
      name: "Jenna Nguyen",
      title: "Sales & Marketing Manager",
      content:
        "Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.",
      image: member1,
    },
    {
      name: "Jaden Nguyen",
      title: "Founder & CEO",
      content:
        "Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.",
      image: member2,
    },
    {
      name: "My Nguyen",
      title: "Product manager",
      content:
        "Sed pretium, ligula sollicitudin viverra, tortor libero sodales leo, eget blandit nunc.",
      image: member3,
    },
  ];

  return (
    <Layout>
      <MetaData title="Ecommerce - About" />
      <Container>
        <div className="main-image">
          <img src={MainImage} alt="main-img" className="img-res" />
        </div>
        <div className="main">
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            sx={{ marginTop: "20px" }}
          >
            <Grid item xl={6} md={6} sm={6} xs={12}>
              <h1 className="page-heading">Our Vision</h1>
              <div className="text-page">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium,
                ligula sollicitudin laoreet viverra, tortor libero sodales leo,
                eget blandit nunc tortor eu nibh.
              </div>
            </Grid>
            <Grid item xl={6} md={6} sm={6} xs={12}>
              <h1 className="page-heading">Our Mission</h1>
              <div className="text-page">
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. Morbi purus libero, faucibus
                adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent
                elementum hendrerit tortor. Sed semper lorem at felis.
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            sx={{
              marginTop: { xl: "60px", md: "60px", sm: "20px", xs: "20px" },
            }}
          >
            <Grid item xl={6} md={6} sm={6} xs={12}>
              <h1 className="page-heading">Who We Are</h1>
              <div className="text-page">
                Pellentesque odio nisi, euismod pharetra a ultricies in diam.
                Sed arcu. Cras consequat <br />
                Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
                sodales leo, eget blandit nunc tortor eu nibh. Suspendisse
                potenti. Sed egestas, ante et vulputate volutpat, uctus metus
                libero eu augue.
              </div>
            </Grid>
            <Grid item xl={6} md={6} sm={6} xs={12}>
              <div style={{ textAlign: "center" }}>
                <img src={img2} alt="img-2" className="img-res" />
              </div>
            </Grid>
          </Grid>
          <hr style={{ margin: "50px 0" }} />
          <h1
            className="our-team"
            style={{ textAlign: "center", marginBottom: "0" }}
          >
            Meet Our Team
          </h1>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            sx={{
              marginTop: { xl: "30px", md: "30px", sm: "20px", xs: "20px" },
            }}
          >
            {member?.map((item, i) => (
              <Grid item xl={4} md={4} sm={4} xs={12} key={i}>
                <div className="about-image">
                  <img src={item.image} alt="main-img" className="img-res" />
                  <div className="about-box">
                    <div className="name">{item.name}</div>
                    <div className="title">{item.title}</div>
                    <div className="content">{item.content}</div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
