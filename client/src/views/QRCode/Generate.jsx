import React from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

const Generate = () => {
  const params = useParams();
  return (
    <div
      style={{
        margin: "0 auto",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ marginBottom: "3rem" }}>
        Use this QR Code for the product verification
      </h3>
      <QRCode value={params.product} />
      <h5 style={{ marginTop: "2.5rem", color: "#6c757d" }}>Address</h5>
      <p style={{ marginTop: "0.3rem" }}>{params.product}</p>
    </div>
  );
};

export default Generate;
