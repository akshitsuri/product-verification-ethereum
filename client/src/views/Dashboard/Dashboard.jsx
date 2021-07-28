import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { Form, Button, Spinner, Col } from "react-bootstrap";
import web3 from "../../utils/web3";
import factory from "../../utils/factory";
import { setAlert } from "../../slices/alert";
import { addProduct } from "../../slices/product";
import { setLoading, clearLoading } from "../../slices/loading";

import * as ROUTES from "../../constants/routes";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const {
    auth: { isAuthenticated, user },
    loading,
  } = useSelector((state) => {
    return {
      auth: state.auth,
      loading: state.loading.loading,
    };
  }, shallowEqual);

  const [name, setName] = useState("");
  const [company, setCompany] = useState(user ? user.name : "");
  const [manfYear, setManfYear] = useState("");
  const [manfPlace, setManfPlace] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    if (name === "" || manfYear === "" || manfPlace === "")
      dispatch(setAlert("Fill the details properly", "error"));
    else {
      dispatch(setLoading());
      try {
        await factory.methods
          .createProduct(name, user.name, manfYear, manfPlace)
          .send({
            from: accounts[0],
          });

        const products = await factory.methods.getProducts().call();
        const product = products[products.length - 1];
        dispatch(setAlert("Product Registered", "success"));
        dispatch(addProduct(product));
        history.push(`/dashboard/generate-qrcode/${product}`);
      } catch (err) {
        dispatch(setAlert(err.message, "error"));
      }
      dispatch(clearLoading());
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: width > 800 ? "row" : "column",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: "2rem", color: "#6C757D" }}>
        <h1 style={{ color: "#000" }}>Dashboard</h1>
        <Link style={{ textDecoration: "none" }} to={ROUTES.VIEW_MY_PRODUCTS}>
          <Button
            style={{ marginBottom: "1rem", marginTop: "3rem" }}
            variant="primary"
          >
            View My Products
          </Button>
        </Link>
        <p>
          {user && user.products.length} product(s) registered with your company
        </p>
      </div>
      <div style={{ marginTop: "4rem", width: width > 600 ? "40%" : "80%" }}>
        <h4 style={{ marginBottom: "2rem", fontWeight: "bold" }}>
          Register Product
        </h4>
        <Form onSubmit={onSubmit}>
          <Form.Group
            style={{ marginTop: "1rem" }}
            controlId="formGridAddress1"
          >
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group style={{ marginTop: "1rem" }} controlId="formGridState">
              <Form.Control
                value={manfYear}
                onChange={(e) => setManfYear(e.target.value)}
                placeholder="Manufacture Year"
              />
            </Form.Group>
            <Form.Group style={{ marginTop: "1rem" }} controlId="formGridState">
              <Form.Control
                value={manfPlace}
                onChange={(e) => setManfPlace(e.target.value)}
                placeholder="Manufacture Place"
              />
            </Form.Group>
          </Form.Row>

          <Button
            style={{ marginTop: "2rem", width: "155px" }}
            variant="primary"
            type="submit"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Register Product"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
