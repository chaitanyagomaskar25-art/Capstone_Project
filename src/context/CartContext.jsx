import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const CartContext = createContext();
const DispatchContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext value={cart}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </CartContext>
  );
};


export const useCart = ()=>{
    const result = useContext(CartContext)
    if (result === undefined){
        throw new Error("Cartcontext is undefined");
    }
    return result
}

export const useDispatch = ()=>{
    const result = useContext(DispatchContext)
    if (result === undefined){
        throw new Error("Cartcontext is undefined");
    }
    return result
}