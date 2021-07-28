import API from "./api";

export const addProduct = async (product) => {
  try {
    const res = await API.put("/product/add-product", { product });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const removeProduct = async (product) => {
  try {
    const res = await API.put("/product/remove-product", { product });
    return res.data;
  } catch (err) {
    throw err;
  }
};
