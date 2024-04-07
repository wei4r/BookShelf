import React, { useContext } from 'react';
import CartTable from './CartTable';
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";

function Checkout() {
    const  {dispatch} = useContext(CartStore);
    const clearCart = () => {
        // @ts-ignore
        dispatch({ type: CartTypes.CLEAR });
    };
    return (
        <div>
            <h1>Test Test Test</h1>
            <h1>Cart Page</h1>
            <CartTable></CartTable>
            <button onClick={clearCart}>Clear Cart</button>
            {/* Add more buttons and functionality as needed */}
        </div>
    );
}

export default Checkout;
