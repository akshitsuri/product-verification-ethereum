const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compileFactory = require("../ethereum/build/ProductFactory.json");
const compileProduct = require("../ethereum/build/Product.json");

let accounts, factory, productAddress, product;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({
      data: compileFactory.bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  await factory.methods
    .createProduct("IPHONE 10", "Apple.inc", "2018", "China")
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  productAddress = await factory.methods.products(0).call();

  product = await new web3.eth.Contract(
    JSON.parse(compileProduct.interface),
    productAddress
  );
});

describe("Products", () => {
  //deployed success
  it("deploys factory and product", () => {
    assert.ok(factory.options.address);
    assert.ok(product.options.address);
  });

  it("marks the manager as account 1 for 1st product", async () => {
    const manager = await product.methods.manager().call();
    assert.strictEqual(accounts[0], manager);
  });

  it("checks the details of the product made", async () => {
    const details = await product.methods.getSummary().call();
    assert.strictEqual("IPHONE 10", details[0]);
    assert.strictEqual("Apple.inc", details[1]);
    assert.strictEqual("2018", details[2]);
    assert.strictEqual("China", details[3]);
  });
  it("edits the product details", async () => {
    await product.methods.edit("IPHONE 10", "Apple.inc", "2020", "China").send({
      from: accounts[0],
    });
    const details = await product.methods.getSummary().call();
    assert.strictEqual("2020", details[2]);
  });

  it("throw error if anyone except manager edits the product", async () => {
    try {
      await product.methods
        .edit("IPHONE 10", "Apple.inc", "2020", "China")
        .send({
          from: accounts[1],
        });

      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("deletes the product", async () => {
    await factory.methods.deleteProduct(0).send({
      from: accounts[0],
    });
    product = await factory.methods.products(0).call();
    assert.strictEqual("0x0000000000000000000000000000000000000000", product);
  });
});
