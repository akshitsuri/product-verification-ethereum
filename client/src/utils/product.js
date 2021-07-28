import web3 from "./web3";

//abi of interface of campaign
import productContract from "./build/Product.json";

const createProduct = async (address) => {
  const campaign = await new web3.eth.Contract(
    JSON.parse(productContract.interface),
    address
  );
  return campaign;
};

export default createProduct;
