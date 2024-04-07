import  "../assets/css/Cart.css"
import React, { useContext } from 'react';
import CartTable from './CartTable';
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";

function Cart() {
    const  {dispatch} = useContext(CartStore);
    const clearCart = () => {
        // @ts-ignore
        dispatch({ type: CartTypes.CLEAR });
    };
    return (
        <div className="main">
            <CartTable></CartTable>
            <button onClick={clearCart}>Clear Cart</button>
            {/* Add more buttons and functionality as needed */}
        </div>
    );
}

export default Cart;
