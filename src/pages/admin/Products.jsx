import React from 'react'
import { deleteProduct, getProducts } from '../../api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';

const Products = () => {
    const queryClient = useQueryClient();
const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const mutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h1>Admin Products</h1>


      <br />
      <br />

      {data.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            width={100}
          />

          <h3>{product.title}</h3>

          <p>₹ {product.price}</p>

          <Link
            to={`/admin/edit-product/${product.id}`}
          >
            Edit
          </Link>

          <button
            onClick={() =>
              mutation.mutate(product.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products
