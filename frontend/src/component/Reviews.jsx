import { Avatar, Rating } from "@mui/material";
import React from "react";

const Reviews = ({ item }) => {
  return (
    <div className="reviewer">
      <div className="avatar">
        <Avatar src="/broken-image.jpg" sx={{ width: 80, height: 80 }} />
      </div>
      <div className="review-body">
        <div className="user-name">{item.name}</div>
        <Rating name="read-only" value={item.rating} readOnly />
        <div className="comment">{item.comment}</div>
      </div>
    </div>
  );
};

export default Reviews;
