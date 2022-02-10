import { Container, Grid } from "@mui/material";
import React from "react";
import Layout from "../component/layout/Layout";
import MetaData from "../component/layout/MetaData";
import MainImage from "../component/assets/about-header-bg.jpg";
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
