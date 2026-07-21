import React from 'react'
import CartCard from '../components/CartCard'
import { useCart, useDispatch } from '../context/CartContext'

const Cart = () => {
  const cart = useCart()
  const dispatch = useDispatch()
  const totalPrice = cart.reduce((total, item)=>total+item.price* item.quantity, 0)

  if (cart.length === 0){
    return <h3>Your Cart is Empty....</h3>
  }


  return (
    <div>
      {cart.map((product)=><CartCard key={product.id} item={product} />)}
      <p>Total Cart Item Price: {totalPrice}</p>
      <button onClick={()=>dispatch({type: 'CLEAR_CART'})}>Clear Cart</button>
    </div>
  )


}

export default Cart
