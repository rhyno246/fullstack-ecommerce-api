import { Button, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemToCart } from "../redux/actions/cartAction";
import InputNumber from "rc-input-number";
import { useAlert } from "react-alert";

const CartItems = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const alert = useAlert();
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = Number(quantity) + 1;
    if (stock <= quantity) return;
    setQuantity(newQty);
    dispatch(addItemsToCart(id, newQty));
  };

  const decrimentQuantity = (id, quantity) => {
    const newQty = Number(quantity) - 1;
    if (newQty === 0) return;
    setQuantity(newQty);
    dispatch(addItemsToCart(id, newQty));
  };
  const handleOnblur = (e, id) => {
    let number = e.target.value;
    if (number === null) {
      return;
    }
    if (number > item.stock) {
      alert.error(`This product quantity just ${item.stock} please try again`);
      return;
    }
    if (number < 1) {
      alert.error(`Something went wrong with quantity ${number}`);
      return;
    }
    dispatch(addItemsToCart(id, number));
    setQuantity(number);
  };

  const handleRemoveCart = (id) => {
    dispatch(removeItemToCart(id));
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Link
          to={`/product/${item.id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          {item.name}
        </Link>
      </TableCell>
      <TableCell align="center">
        <img
          src={item.image ? item.image : `/broken-image.jpg`}
          alt=""
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      </TableCell>
      <TableCell align="center">
        <span>${item.price}</span>
      </TableCell>
      <TableCell align="center">
        <div className="cartitem-control" style={{ margin: "10px 0" }}>
          <Button
            variant="contained"
            sx={{ padding: "0px", minWidth: "35px" }}
            onClick={() => decrimentQuantity(item.id, item.quantity)}
          >
            -
          </Button>
          <InputNumber
            controls={true}
            type="number"
            max={item.stock}
            min={1}
            value={quantity}
            onBlur={(e) => handleOnblur(e, item.id)}
          />
          <Button
            variant="contained"
            sx={{ padding: "0px", minWidth: "35px" }}
            onClick={() => increaseQuantity(item.id, item.quantity, item.stock)}
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell align="center">${item.price * item.quantity}</TableCell>
      <TableCell align="center">
        <DeleteIcon
          onClick={() => handleRemoveCart(item.id)}
          style={{ cursor: "pointer" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default CartItems;
