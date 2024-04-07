import React, {createContext, Dispatch, useEffect, useReducer, useState} from "react";
import {cartReducer, } from "../reducers/CartReducer";
import { ShoppingCartItem} from "../my_types";

const initialCartState: ShoppingCartItem[] = [];
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

// the rest of the code comes here

const storageKey = 'cart';
export const CartContext = ({ children }: { children: React.ReactNode }) => {

    // @ts-ignore
    const [cart, dispatch] = useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );
    // Use effect to save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]); // Only re-run the effect if cart changes
    return <CartStore.Provider value={{ cart, dispatch }}>{children}</CartStore.Provider>;
};