import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiURL + "/categories";

function categoryEndpoint(id) {
  return `${apiEndpoint}/${id}`;
}

async function getCategoryById(id) {
  const { data } = await http.get(categoryEndpoint(id));

  return data;
}

async function createCategory(category) {
  const { data } = await http.post(apiEndpoint, category);

  return data;
}

async function updateCategory(id, category) {
  const { data } = await http.put(categoryEndpoint(id), category);

  return data;
}

async function deleteCategory(id) {
  const { data } = await http.delete(categoryEndpoint(id));

  return data;
}

export default {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
