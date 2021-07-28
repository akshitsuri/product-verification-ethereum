import { useEffect } from "react";
//routing
import * as ROUTES from "./constants/routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

//store
import { Provider } from "react-redux";
import store from "./store/store";
import { loadUser } from "./slices/auth";
import setAuthToken from "./utils/setAuthToken";

//css for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

//views
import Home from "./views/Home";
import Verify from "./views/Verify/Verify";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";
import Generate from "./views/QRCode/Generate";
import MyProducts from "./views/Dashboard/MyProducts";
//components
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

const App = () => {
  useEffect(() => {
    const loadMe = async () => {
      if (localStorage.token) {
        await setAuthToken(localStorage.token);
        store.dispatch(loadUser());
      }
    };
    loadMe();
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Alert />

        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route exact path={ROUTES.VERIFY}>
            <Container style={{ marginTop: "4rem" }}>
              <Verify />
            </Container>
          </Route>
          <Route exact path={ROUTES.LOGIN}>
            <Container style={{ marginTop: "4rem" }}>
              <Login />
            </Container>
          </Route>
          <Route exact path={ROUTES.REGISTER}>
            <Container style={{ marginTop: "4rem" }}>
              <Register />
            </Container>
          </Route>
          <PrivateRoute exact path={ROUTES.DASHBOARD}>
            <Container style={{ marginTop: "4rem" }}>
              <Dashboard />
            </Container>
          </PrivateRoute>
          <PrivateRoute exact path={ROUTES.QRCODE_GENERATE}>
            <Container style={{ marginTop: "4rem" }}>
              <Generate />
            </Container>
          </PrivateRoute>
          <PrivateRoute exact path={ROUTES.VIEW_MY_PRODUCTS}>
            <Container style={{ marginTop: "4rem" }}>
              <MyProducts />
            </Container>
          </PrivateRoute>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
