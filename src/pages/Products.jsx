import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/api'
import ProductCard from '../components/ProductCard'
import useDebounce from '../hook/useDebouunce'

const Products = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const {data: products = [], isLoading, isError, error,} = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60,
    gcTime: 5000 * 60,
    refetchInterval: 5000*60,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
const filteredProducts = products.filter((product) => {
  const title = product?.title ?? "";
  const input = debouncedSearch ?? "";
  
  return title.toLowerCase().includes(input.toLowerCase());
});

  if (isLoading) {
    return <h2>Loading Products...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  
       return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
      />

      <div
        
      >{filteredProducts.length > 0 ?
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        )): <h1>No products found</h1>}
      </div>
    </div>
 
  )
}

export default Products
