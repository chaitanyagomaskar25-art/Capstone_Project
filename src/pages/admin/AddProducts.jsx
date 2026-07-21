import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import { addProducts } from "../../api/api";
import ProductForm from "../../components/admin/ProductForm";

const AddProducts = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addProducts,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["products"],
      });
      navigate("/admin/products");
    },
  });
  const handleSubmit = (data) => {
    mutation.mutate(data);
  };
  return <div>
    <h1>Add Products</h1>
    <ProductForm initiaData={null} onSubmit={handleSubmit} buttonText="Add Product" />

    {mutation.isPending && <p>Adding Products...</p>}
    {mutation.isError && <p>{mutation.error.message}</p>}
  </div>;
};

export default AddProducts;
