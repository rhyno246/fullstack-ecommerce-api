import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import PaymentIcon from "@mui/icons-material/Payment";
const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <PaymentIcon />,
    },
  ];
  return (
    <div className="steps" style={{ marginTop: "30px" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel
              style={{ color: activeStep >= i ? "#1976d2" : "#000" }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
