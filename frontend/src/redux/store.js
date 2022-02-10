import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { bannerReducer } from "./reducers/bannerReducer";
import { contactReducer } from "./reducers/contactReducer";
const reducer = combineReducers({
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  banner: bannerReducer,
  contact: contactReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
