import { Container } from "@mui/material";
import React from "react";

const Footer = () => {
  var content = `<a href="https://www.facebook.com/profile.php?id=100009131997074">@ManNguyen</a>`;
  return (
    <div className="footer" style={{ marginTop: "auto" }}>
      <Container>
        <div className="copyright">
          Copy-right 2022 by
          <span
            className="flow"
            dangerouslySetInnerHTML={{
              __html: content.replace(/href/g, "target='_blank' href"),
            }}
          ></span>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
