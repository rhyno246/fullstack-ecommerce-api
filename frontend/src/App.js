import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
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
import axiosConfig from "./redux/config/axiosConfig";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./view/Payment";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./view/OrderSuccess";
import OrderDetail from "./view/OrderDetail";
import Products from "./view/admin/Products";
import Orders from "./view/admin/Orders";
import Users from "./view/admin/Users";
import Reviews from "./view/admin/Reviews";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const data = await axiosConfig.get("/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
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
          path="/admin/users"
          component={Users}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={Reviews}
        />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
