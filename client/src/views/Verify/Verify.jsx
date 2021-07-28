import React, { useState, Fragment } from 'react';
import QrReader from 'react-qr-reader';
import { Button, Modal } from 'react-bootstrap';
import factory from '../../utils/factory';
import web3 from '../../utils/web3';
import createProduct from '../../utils/product';
import { setAlert } from '../../slices/alert';
import { setLoading, clearLoading } from '../../slices/loading';
import { useDispatch } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Product Details{' '}
          <CheckCircleOutlineIcon
            fontSize='large'
            style={{ color: 'green', marginLeft: '2rem' }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.product && (
          <Fragment>
            <h5>
              <span style={{ fontWeight: 'bold', color: '#0e6efd' }}>
                Product Name :{' '}
              </span>
              {props.product[0]}
            </h5>
            <h5>
              <span style={{ fontWeight: 'bold', color: '#0e6efd' }}>
                Company :{' '}
              </span>
              {props.product[1]}
            </h5>
            <h5>
              <span style={{ fontWeight: 'bold', color: '#0e6efd' }}>
                Manufacture year :{' '}
              </span>
              {props.product[2]}
            </h5>
            <h5>
              <span style={{ fontWeight: 'bold', color: '#0e6efd' }}>
                Manufacture place :{' '}
              </span>
              {props.product[3]}
            </h5>
          </Fragment>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Verify = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  const [product, setProduct] = useState(null);
  const [verified, setVerified] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleScan = async (data) => {
    const products = await factory.methods.getProducts().call();
    if (data) {
      if (products.includes(data)) {
        const thisProduct = await createProduct(data);
        const summary = await thisProduct.methods.getSummary().call();
        setProduct(summary);
        setResult('Product Verified!');
        setVerified(true);
      } else {
        setVerified(false);
        setResult('Product Not Verified');
      }
    }
  };
  const handleError = (err) => {
    dispatch(setAlert(err, 'error'));
  };

  return (
    <div
      style={{
        width: width > 600 ? '35%' : '80%',
        height: width > 600 ? '35%' : '80%',
        margin: '0 auto',
      }}
    >
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <h4 style={{ margin: '2rem auto', textAlign: 'center' }}>
        {result}
        {result !== '' && (
          <div>
            {verified ? (
              <CheckCircleOutlineIcon
                style={{ color: 'green', marginLeft: '0rem' }}
              />
            ) : (
              <CancelIcon style={{ color: 'red', marginLeft: '0rem' }} />
            )}
          </div>
        )}
      </h4>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {verified && (
          <Button
            style={{ margin: '0 auto' }}
            primary
            onClick={() => setModalShow(true)}
          >
            View Details
          </Button>
        )}
      </div>
      <MyVerticallyCenteredModal
        product={product}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Verify;
