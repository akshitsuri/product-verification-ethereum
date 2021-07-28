import React, { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import web3 from "../../utils/web3";
import createProduct from "../../utils/product";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import factory from "../../utils/factory";
import { removeProduct } from "../../slices/product";
import { Spinner } from "react-bootstrap";
import { setLoading, clearLoading } from "../../slices/loading";

const ProductRow = ({ product, id, call }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSummary = async () => {
      const instance = await createProduct(product);
      const thisProduct = await instance.methods.getSummary().call();
      setData(thisProduct);
    };
    getSummary();
  }, []);

  const onDelete = async () => {
    const accounts = await web3.eth.getAccounts();
    const products = await factory.methods.getProducts().call();
    setLoading(true);
    const index = products.findIndex(
      (prod) => prod.toString() === product.toString()
    );
    await factory.methods.deleteProduct(index).send({
      from: accounts[0],
    });
    dispatch(removeProduct(product));
    setLoading(false);
    call((bool) => !bool);
  };
  return (
    <tr>
      {data && (
        <Fragment>
          <td>{id + 1}</td>
          <td>{data[0]}</td>
          <td>{data[2]}</td>
          <td>{data[3]}</td>
          <td>
            <Link
              to={`/dashboard/generate-qrcode/${product}`}
              style={{ textDecoration: "none", color: "#00c" }}
            >
              View
            </Link>
          </td>
          <td>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <DeleteIcon
                onClick={() => onDelete()}
                style={{ color: "red", cursor: "pointer" }}
              />
            )}
          </td>
        </Fragment>
      )}
    </tr>
  );
};

export default ProductRow;
