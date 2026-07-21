const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async () => {
  const responce = await fetch(`${BASE_URL}/products`);
  return responce.json();
};

export const getProductDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res;
};
