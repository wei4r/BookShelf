import  "../assets/css/CartTable.css"
import {BookItem, CategoryItem, ShoppingCartItem} from "../my_types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {useContext} from "react";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";
import React from "react";
import {asDollarsAndCents} from "../utils";
import {Link} from "react-router-dom";

function Confirmation()
{
    const { cart, dispatch } = useContext(CartStore);
    // console.log(cart);

    // @ts-ignore
    const handleIncrement = (itemId) => {
        dispatch({ type: CartTypes.ADD, id:itemId});
    };

    // @ts-ignore
    const handleDecrement = (itemId) => {
        dispatch({ type: CartTypes.REMOVE, id:itemId });
    };
    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR });
    };

    return (
        <main>
            <div className="">
                Confirmation Page
            </div>
        </main>

    )
}

export default Confirmation;

