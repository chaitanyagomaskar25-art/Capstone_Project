const BASE_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
export const getProductDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const addProducts = async (product) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  
  if (!res.ok) {
    throw new Error("Failed to add product");
  }

  return res.json();
}

export const updateProduct = async ({id, product}) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:"PUT",
    headers: {
      "Content-Type":"application/json"
    }, 
    body: JSON.stringify(product)
  })

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
}

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`,{
    method:"DELETE"
  })

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
}