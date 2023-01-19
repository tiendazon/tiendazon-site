import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiURL + "/products";

function productEndpoint(id) {
  return `${apiEndpoint}/${id}`;
}

async function getProductById(id) {
  const { data } = await http.get(productEndpoint(id));

  return data;
}

async function createProduct(product) {
  const { data } = await http.post(apiEndpoint, product);

  return data;
}

async function updateProduct(id, product) {
  const { data } = await http.put(productEndpoint(id), product);

  return data;
}

async function deleteProduct(id) {
  const { data } = await http.delete(productEndpoint(id));

  return data;
}

export default {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
