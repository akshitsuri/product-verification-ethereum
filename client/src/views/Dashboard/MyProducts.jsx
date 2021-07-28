import React, { useState, useEffect, Fragment } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import ProductRow from "./ProductRow";

const MyProducts = () => {
  const [render, reRender] = useState(false);
  const {
    auth: { isAuthenticated, user },
    loading,
  } = useSelector((state) => {
    return {
      auth: state.auth,
      loading: state.loading.loading,
    };
  }, shallowEqual);

  useEffect(() => {}, [render]);
  return (
    <div>
      <h3 style={{ fontWeight: "bold" }}>My Products</h3>
      {user && user.products.length === 0 ? (
        <Fragment>
          <p style={{ marginTop: "2rem" }}>No products found</p>
        </Fragment>
      ) : (
        <Table
          style={{ marginTop: "3rem" }}
          //striped
          bordered
          hover
          // variant="dark"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Manufacture Year</th>
              <th>Manufacture Place</th>
              <th>QR Code</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.products.map((prod, i) => (
                <ProductRow
                  loading={loading}
                  call={reRender}
                  product={prod}
                  key={i}
                  id={i}
                />
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MyProducts;
