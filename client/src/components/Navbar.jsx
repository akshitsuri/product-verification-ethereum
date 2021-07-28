import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/auth";
import * as ROUTES from "../constants/routes";

const CustomLink = ({ children, to }) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        marginLeft: width > 600 ? "2.5rem" : "1rem",
        fontSize: width > 600 ? "1.1rem" : "0.8rem",
        color: "#fff",
      }}
    >
      {children}
    </Link>
  );
};

const TopNavbar = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const dispatch = useDispatch();
  const {
    auth: { isAuthenticated, user },
  } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);
  return (
    <Navbar style={{ height: "4rem" }} bg="dark" variant="dark">
      <Container>
        <Link
          style={{
            textDecoration: "none",
          }}
          to={ROUTES.HOME}
        >
          <Navbar.Brand style={{ fontSize: width > 600 ? "1.2rem" : "0.8rem" }}>
            E-Product Verification
          </Navbar.Brand>
        </Link>
        <Nav>
          <CustomLink to={ROUTES.VERIFY}>Verify</CustomLink>
          {isAuthenticated && user ? (
            <Fragment>
              <CustomLink to={ROUTES.DASHBOARD}>{user.name}</CustomLink>
              <CustomLink>
                <span onClick={() => dispatch(logout())}>Logout</span>
              </CustomLink>
            </Fragment>
          ) : (
            <Fragment>
              <CustomLink to={ROUTES.LOGIN}>Login</CustomLink>
              <CustomLink to={ROUTES.REGISTER}>Register</CustomLink>
            </Fragment>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
