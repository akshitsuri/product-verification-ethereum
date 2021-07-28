const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("./build/ProductFactory.json");

//connecting our metamask to the web 3 by creating a provider via infura
//! web3 -> provider -> truffle -> wallet = infura + neumonic phase
const provider = new HDWalletProvider("", "");
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({
      gas: "1000000",
      from: accounts[0],
    });
  //console.log("Interface is : ", interface);
  console.log("Contract deployed to", result.options.address);
};
deploy();
