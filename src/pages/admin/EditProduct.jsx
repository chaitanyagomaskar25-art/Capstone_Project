import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProductDetails, updateProduct } from '../../api/api'
import ProductForm from '../../components/admin/ProductForm'

const EditProduct = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['product', id],
    queryFn: ()=>getProductDetails(id)
  })
  const mutation = useMutation({
    mutationFn: (updatedProduct)=>(updateProduct({id, product: updatedProduct})),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      navigate("/admin/products");
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
      <h1>Edit Product</h1>

      <ProductForm
        initialData={data}
        onSubmit={mutation.mutate}
        buttonText="Update Product"
      />

      {mutation.isPending && <p>Updating...</p>}
    </div>
  );
}

export default EditProduct
