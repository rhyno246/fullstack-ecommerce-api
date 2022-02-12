import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Home from "./view/Home";
import Product from "./view/Product";
import Contact from "./view/Contact";
import About from "./view/About";
import ProductDetail from "./view/ProductDetail";
import Login from "./view/Login";
import NotFound from "./view/NotFound";
import Register from "./view/Register";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import Profile from "./view/Profile";
import ProtectedRoute from "./component/routing/ProtectedRoute";
import Dashboard from "./view/admin/Dashboard";
import Order from "./view/Order";
import UpdateProfile from "./view/UpdateProfile";
import ChangePassword from "./view/ChangePassword";
import ForgotPassWord from "./view/ForgotPassWord";
import ResetPassWord from "./view/ResetPassWord";
import Cart from "./view/Cart";
import Shipping from "./view/Shipping";
import ConfirmOrder from "./view/ConfirmOrder";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./view/Payment";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./view/OrderSuccess";
import OrderDetail from "./view/OrderDetail";
import Products from "./view/admin/Products";
import Orders from "./view/admin/Orders";
import ListUsers from "./view/admin/ListUsers";
import Reviews from "./view/admin/Reviews";
import AddNewProduct from "./view/admin/AddNewProduct";
import UpdateProduct from "./view/admin/UpdateProduct";
import EditOrder from "./view/admin/EditOrder";
import UserDetails from "./view/admin/UserDetails";
import SlideShow from "./view/admin/SlideShow";
import AddNewSlider from "./view/admin/AddNewSlider";
import SlideShowDetail from "./view/admin/SlideShowDetail";
import ContactAdmin from "./view/admin/ContactAdmin";
import { useSelector } from "react-redux";
function App() {
  const users = JSON.parse(localStorage.getItem("users"));
  const { stripleKey } = useSelector((state) => state.order);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    if (users) {
      store.dispatch(loadUser());
    }
  }, [users]);

  return (
    <Router>
      {stripleKey && (
        <Elements stripe={loadStripe(stripleKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route exact path="/products" component={Product} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/password/forgot" component={ForgotPassWord} />
        <Route exact path="/password/reset/:token" component={ResetPassWord} />
        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/order" component={Order} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetail} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={ChangePassword}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={Products}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={Orders}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders/:id"
          component={EditOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products/reviews/:id"
          component={Reviews}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={ListUsers}
        />
        <Route
          isAdmin={true}
          exact
          path="/admin/users/:id"
          component={UserDetails}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={AddNewProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/slider"
          component={SlideShow}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/slider/new"
          component={AddNewSlider}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/slider/:id"
          component={SlideShowDetail}
        />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/contact"
          component={ContactAdmin}
        />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
