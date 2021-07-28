//now we will not compile our contract while deploying
//instead we will save our compiled contracts in build folder before hand
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

//delete the build folder
fs.removeSync(buildPath);

const productPath = path.resolve(__dirname, "contracts", "Product.sol");
const source = fs.readFileSync(productPath, "utf8");

//output will contain two objects of two contracts
const output = solc.compile(source, 1).contracts;

//create the directory if not already
fs.ensureDirSync(buildPath);

//contents of each compiled contracts will be stored in json files in build folder
//each json file will contain abi (interface) and bytecode for the same
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
