import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import logo from "../assets/product.png";
import CropFreeIcon from "@material-ui/icons/CropFree";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { AndroidOutlined } from "@material-ui/icons";
import Particle from "../components/Particle";

const Home = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#212629",
        padding: "1rem",
        height: width > 600 ? "100vh" : "160vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "3rem",
          width: "100%",
          height: "100%",
        }}
      >
        <Particle />
      </div>
      {/* <h2
        style={{
          margin: "1rem auto",
          letterSpacing: "0.1rem",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        E-PRODUCT VERIFICATION
      </h2> */}

      <img
        alt="logo"
        style={{
          height: "300px",
          width: "300px",
          borderRadius: "70px",
          marginTop: width > 600 ? "0rem" : "2rem",
        }}
        src={logo}
      />
      <Card
        border="dark"
        style={{
          // width: '18rem',
          marginTop: "3rem",
          marginBottom: "0rem",
          borderRadius: "18px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Card.Body style={{ display: 'flex', justifyContent: 'center' }}> */}
        <Button
          startIcon={<AndroidOutlined style={{ color: "green" }} />}
          variant="contained"
          style={{
            fontSize: "1rem",
            borderRadius: "12px",
            fontWeight: "bold",
            color: "black",
            padding: "1rem",
          }}
          // fullWidth
        >
          <a
            href="https://society-manager.s3.ap-south-1.amazonaws.com/finalApp.apk"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "black" }}
          >
            Download Android App
          </a>
        </Button>
        {/* </Card.Body> */}
      </Card>
      <div
        style={{
          display: "flex",
          flexDirection: width > 600 ? "row" : "column",
          marginTop: "7rem",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Card border="dark" style={{ width: "18rem", marginBottom: "2rem" }}>
          <Card.Body>
            <Card.Title>
              <CropFreeIcon style={{ marginRight: "1rem" }} />
              Verification
            </Card.Title>
            <Card.Text>
              Verify the products on our portal before you buy them online or
              from the stores.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="dark" style={{ width: "18rem", marginBottom: "2rem" }}>
          <Card.Body>
            <Card.Title>
              <LocationCityIcon style={{ marginRight: "1rem" }} />
              Company
            </Card.Title>
            <Card.Text>
              The Companies can register their products here to get a QR Code
              for verification.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="dark" style={{ width: "18rem", marginBottom: "2rem" }}>
          <Card.Body>
            <Card.Title>
              <PeopleAltIcon style={{ marginRight: "1rem" }} />
              Users
            </Card.Title>
            <Card.Text>
              Users can scan the QR Code to check whether it is legitimate or
              not and view it's details.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
