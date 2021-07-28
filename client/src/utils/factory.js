import web3 from "./web3";

//abi of interface of factory
import factoryContract from "./build/ProductFactory.json";

//address of deployed factory contract
const address = "";

const factory = new web3.eth.Contract(
  JSON.parse(factoryContract.interface),
  address
);

export default factory;
