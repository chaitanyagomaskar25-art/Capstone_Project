import React from 'react'
import { useDispatch } from '../context/CartContext'

const CartCard = ({item}) => {
    const dispatch = useDispatch()
  return (
    <div>
        <h3>Cart</h3>
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={()=>dispatch({type:"INCREMENT", payload: item.id})}>+</button>
      <button onClick={()=>dispatch({type:"DECREMENT", payload: item.id})}>-</button>
      <button onClick={()=>dispatch({type:"REMOVE", payload: item.id})}>REMOVE</button>
    </div>
  )
}

export default CartCard
