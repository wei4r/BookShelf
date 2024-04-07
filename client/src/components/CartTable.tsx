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


    const getBookImageUrl = function (book: BookItem): string {
        let filename = book.title.toLowerCase();
        filename = filename.replace(/ /g, "-");
        filename = filename.replace(/'/g, "");
        filename = filename + ".jpg";
        try {
            return require('../assets/images/books/' + filename);
        } catch (_) {
            return require('../assets/images/books/the-iliad.jpg');
        }
    };
 function CartTable()
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
        <div className="cart-table">
            <ul className = "cart-table-heading">
                <li className="table-heading">
                    <div className="heading-book">Book</div>
                    <div className="heading-price">Price</div>
                    <div className="heading-quantity">Quantity</div>
                    <div className="heading-subtotal">Amount</div>
                </li>
            </ul>
            <ul className="cart2">
                {cart.length === 0 ? (
                    <div className="empty-cart-message">Your cart is empty!</div>
                ) : (
                    cart.map((item) => (
                        <li key={item.id} className="li-item">
                            <div className="cart-book-image">
                                <img src={getBookImageUrl(item.book)} alt={item.book.title} />
                                <div className="cart-book-title">{item.book.title}</div>
                            </div>
                            <div className="cart-book-price">{asDollarsAndCents(item.book.price)}</div>
                            <div className="cart-book-quantity">
                                <button className="icon-button dec-button" onClick={() => handleDecrement(item.id)}>
                                    <FontAwesomeIcon icon={faMinusCircle} />
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button className="icon-button inc-button" onClick={() => handleIncrement(item.id)}>
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </button>
                            </div>
                            <div className="cart-book-subtotal">{asDollarsAndCents(item.book.price * item.quantity)}</div>
                        </li>
                        // <li className="line-sep"></li>
                    ))
                )}
                {
                    cart.length > 0 && (
                        <li className="clear-button-li">
                            <div id="clear-button" className="clear-button">
                                <button onClick={clearCart}>Clear</button>
                            </div>
                        </li>
                    )
                }


            </ul>
        </div>
        <div className="go-to-checkout">
            <Link to="/checkoutpage" id="proceed-checkout">
                <button className="proceed-checkout">Proceed Checkout</button>
            </Link>
            <Link to="/" id="continue">
                <button className="continue">Continue Shopping</button>
            </Link>
        </div>
    </main>

 )
}

export default CartTable;

