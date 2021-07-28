import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metamask is running.
  //connect to our metamask to get access of all accounts on metamask rinkeby network
  window.ethereum.request({ method: "eth_requestAccounts" });

  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  //using http provider for local storage
  const provider = new Web3.providers.HttpProvider("");
  web3 = new Web3(provider);
}

export default web3;
