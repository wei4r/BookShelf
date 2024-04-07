import {ShoppingCartItem, BookItem} from "../my_types";
import {Dispatch, ReducerAction} from "react";


export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};

type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}
// @ts-ignore
const findItem = (cart, id) => cart.find((item) => item.id === id);

export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            /*
                The following only added the item in the cart for the first time with quantity 1.
                You have to handle the increment of the quantity if the item
                is already in the cart
              */
            const existingItemIndex = state.findIndex(item => item.id === action.id);
            if (existingItemIndex !== -1) {
                return state.map((book, index) =>
                    index === existingItemIndex
                        ? { ...book, quantity: book.quantity + 1 }
                        : book
                );
            }
            // console.log(existingItemIndex);
            // console.log(action.id);
            return [
                ...state,
                {id: action.id,book:action.item, quantity: 1 },
            ];
        case CartTypes.REMOVE:
            /*
               will be defiend in Project 7
             */
            const index = state.findIndex(item => item.id === action.id);
            // If item exists and quantity is more than 1, reduce the quantity
            if (index !== -1 && state[index].quantity > 1) {
                return state.map((item, i) =>
                    i === index ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            // If the quantity is 1, remove the item from the cart
            else if (index !== -1 && state[index].quantity === 1) {
                return state.filter(item => item.id !== action.id);
            }
            return state;
        case CartTypes.CLEAR:
            return [];    // will be defined in Project 7
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }

};