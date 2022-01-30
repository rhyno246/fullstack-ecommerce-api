import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-spin">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
