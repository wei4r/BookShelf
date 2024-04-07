

import  "../assets/css/checkout.css"



//import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../my_types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, useContext, useState} from "react";
import { useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import axios from "axios";
import {OrderDetailsContext, OrderDetailsStore} from "../contexts/OrderDetailsContext";




function CheckoutPage()
{

   // console.log("get full year:", new Date().getFullYear());
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

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const {cart, dispatch} = useContext(CartStore);
   const {orderDetails, dispatch: orderDetailsDispatch} = useContext(OrderDetailsStore);
   const navigate = useNavigate();


   // const cartTotalPrice = 0; // TO DO code that calculates the total price of your cart
   // const cartQuantity = 0 ; // TO DO the code that calculates the total number of items in your cart

   const cartTotalPrice = cart.reduce((total, item) => total + item.book.price * item.quantity, 0);
   const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);


   const [nameError, setNameError] = useState("");
   const [addrError, setAddrError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [ccError, setCCError] = useState("");
   const [ccMonthError, setCCMonthError] = useState("");

   // TO DO error states for the rest of the input elements

   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:1,ccExpiryYear:new Date().getFullYear()});

   const [checkoutStatus, setCheckoutStatus] = useState("");

   function isValidForm()
   {
      //TO DO code that returns true is the customer form is valid, false otherwise
      // return true;
      // console.log("Exp: ", formData.ccExpiryMonth, formData.ccExpiryYear)
      return formData.name && formData.address && formData.phone && formData.email && formData.ccNumber && formData.ccExpiryMonth && formData.ccExpiryYear;

   }

   // @ts-ignore
   function calculateTax(total) {
      const taxRate = 0.06; // 6% tax rate
      return total * taxRate;
   }

   // TO DO placeOrder function comes here. Needed for project 9 (not 8)
   const placeOrder =  async (customerForm: CustomerForm) =>  {
      console.log("start send order...");

      const order = { customerForm: customerForm, cart:{itemArray:cart} };

      const orders = JSON.stringify(order);
      // console.log(orders);     //you can uncomment this to see the orders JSON on the console
      const url = 'api/orders';
      // @ts-ignore
      const orderDetails: OrderDetails = await axios.post(url, orders,
          {headers: {
                "Content-Type": "application/json",
             }
          })
          // @ts-ignore
          .then((response) => {
             dispatch({type: CartTypes.CLEAR});
             console.log("aaa ", response.data);
             return response.data;
          })
          // @ts-ignore
          .catch((error)=>console.log(error));
      // console.log("order deatils: ", orderDetails);
      return orderDetails;
   }
   function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
               setNameError("Name must be at least 4 characters long!");
            }
            else {
               setNameError("");
            }
            break;
         case 'address':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
               setAddrError("Address must be at least 4 characters long!");
            }
            else {
               setAddrError("");
            }
            // Add address validation logic here
            break;
         case 'phone':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if (!/^\d+$/.test(value) && value !== '') {
               setPhoneError("Phone number must contain only digits");
            } else {
               setPhoneError(""); // Clear error if input is valid
            }
            // Add phone validation logic here (example: isMobilePhone from 'validator' library)
            break;
         case 'email':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(value) && value !== '') {
               setEmailError("Invalid email address");
            } else {
               setEmailError(""); // Clear error if input is valid
            }
            // Add email validation logic here (example: isEmail from 'validator' library)
            break;
         case 'ccNumber':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if (!/^\d+$/.test(value) && value !== '') {
               setCCError("Credit Card number must contain only digits");
            }
            else if(value.length<14 || value.length>16){
               setCCError("Credit Card number error.");
            }else {
               setCCError(""); // Clear error if input is valid
            }
            // Add credit card number validation logic here (example: isCreditCard from 'validator' library)
            break;
         case 'ccExpiryMonth':
            const monthValue = parseInt(value, 10);
            setFormData((prevFormData) => ({...prevFormData, [name]: monthValue}));
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // getMonth() 從 0（1月）開始計數到 11（12月）
            const inputYear = formData.ccExpiryYear || currentYear; // 使用已選擇的年份，如果未定義則使用當前年份
            if (inputYear === currentYear && monthValue < currentMonth) {
               setCCMonthError("Expiry month cannot be in the past");
            } else {
               setCCMonthError(""); // 如果輸入有效，清除錯誤
            }
            break;
         case 'ccExpiryYear':
            setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value, 10)}));
            break;
         default:
            break;
      }
   }

   // @ts-ignore
   async function submitOrder(event:FormEvent) {
      event.preventDefault();
      console.log("Submit order");
      const isFormCorrect =  isValidForm();
      console.log(isFormCorrect);
      if (!isFormCorrect) {
         setCheckoutStatus("ERROR");
      } else {
         setCheckoutStatus("PENDING");
         const orders = await placeOrder({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            ccNumber: formData.ccNumber,
            ccExpiryMonth: formData.ccExpiryMonth,
            ccExpiryYear: formData.ccExpiryYear,
         })
         if(orders) {
            setCheckoutStatus("OK");
            orderDetailsDispatch({type: "UPDATE", payload: orders});
            navigate('/confirmation');}
         else{
            console.log("Error placing order");
         }
      }
   }

   // TO DO submitOrder function comes here. See the project Spec

   if (!cart || cart.length === 0) {
      return (
          <main className="empty-cart-message">
             <div>Your cart is empty. Please add some items to your cart to checkout.</div>
             <button className="purchase-button" onClick={() => navigate('/categories')}>Continue Shopping</button>
          </main>
      );
   }

   return (
       <main>
          <section className="checkout-cart-table-view">
             <div className="checkout-page-body">
                <div>
                   <form
                       className="checkout-form"
                       // onSubmit ={(event)=>submitOrder(event)}
                       method="post"
                   >
                      <div>
                         <label htmlFor="fname">Name</label>
                         <input
                             type="text"
                             size={20}
                             name="name"
                             id="fname"
                             value={formData.name}
                             onChange={handleInputChange}
                         />
                      </div>
                      <> {nameError && <div className="error"> {nameError}</div>}</>
                      <div>
                         <label htmlFor="phone">Phone</label>
                         <input
                             type="text"
                             size={20}
                             name="phone"
                             id="phone"
                             value={formData.phone}
                             onChange={handleInputChange}
                         />
                         {/* Placeholder for phone error message */}
                         { /* phoneError && <div className="error"> {phoneError}</div> */ }
                      </div>
                      <> {phoneError && <div className="error"> {phoneError}</div>}</>

                      <div>
                         <label htmlFor="address">Address</label>
                         <input
                             type="text"
                             size={20}
                             name="address"
                             id="address"
                             value={formData.address}
                             onChange={handleInputChange}
                         />
                         {/* Placeholder for address error message */}
                         { /* addressError && <div className="error"> {addressError}</div> */ }
                      </div>
                      <> {addrError && <div className="error"> {addrError}</div>}</>

                      <div>
                         <label htmlFor="email">Email</label>
                         <input
                             type="email"
                             size={20}
                             name="email"
                             id="email"
                             value={formData.email}
                             onChange={handleInputChange}
                         />
                         {/* Placeholder for email error message */}
                         { /* emailError && <div className="error"> {emailError}</div> */ }
                      </div>
                      <> {emailError && <div className="error"> {emailError}</div>}</>

                      <div>
                         <label htmlFor="ccNumber" className="credit-card">Credit Card Number</label>
                         <input
                             type="text"
                             size={20}
                             name="ccNumber"
                             id="ccNumber"
                             value={formData.ccNumber}
                             onChange={handleInputChange}
                         />
                         {/* Placeholder for credit card error message */}
                         { /* ccNumberError && <div className="error"> {ccNumberError}</div> */ }
                      </div>
                      <> {ccError && <div className="error"> {ccError}</div>}</>

                      {/*  TO DO add the form elements for phone, address, email, and Credit card*/}
                      {/* Together with the error display*/}

                      <div >
                         <label htmlFor="ccExpiryMonth">Exp Date</label>
                         <select style={{color:'black'}} id ="ccExpiryMonth" name ="ccExpiryMonth" value ={formData.ccExpiryMonth} onChange={handleInputChange}>
                            { months.map((month, i) => (
                                <option  key={i}  value={i + 1}  >
                                   { month }
                                </option>
                            ))}
                         </select>
                         <select style={{color:'black'}} name="ccExpiryYear" value={formData.ccExpiryYear} onChange={handleInputChange}>
                            {years.map((year, i) => (
                                <option key={i} value={yearFrom(i)}>
                                   {yearFrom(i)}
                                </option>
                            ))}
                         </select>
                         {/*TO DO the select input for the expiration year. Read the spec */}
                         {/* about this*/}

                      </div>
                      <>{ccMonthError && <div className="error"> {ccMonthError}</div>}</>
                   </form>
                </div>


                <div className="checkout-box">
                   <div className="sub-tax">Total Before Tax: ${cartTotalPrice.toFixed(2)}</div>
                   <div className="sub-tax">Tax: ${calculateTax(cartTotalPrice).toFixed(2)}</div>
                   <div>Order Total: ${(calculateTax(cartTotalPrice)+cartTotalPrice).toFixed(2)}</div>
                   <button className="purchase-button" onClick={submitOrder}>Complete Purchase</button>
                </div>


                {/* TO DO the checkout box with the total cost, tax) */}
                {/* and the Complete Purchase button comes here*/}


                <div>
                   {/*The following code displays different string based on the */}
                   {/*value of the checkoutStatus*/}
                   {/*Note the ternary operator*/}
                   {
                      checkoutStatus !== ''?
                          <>
                             <section className="checkoutStatusBox" >
                                { (checkoutStatus === 'ERROR')?
                                    <div>
                                       Error: Please fix the problems above and try again.
                                    </div>: ( checkoutStatus === 'PENDING'?
                                        <div>
                                           Processing...
                                        </div> : (checkoutStatus === 'OK'?
                                            <div>
                                               Order placed...
                                            </div>:
                                            <div>
                                               An unexpected error occurred, please try again.
                                            </div>))}
                             </section>
                          </>
                          :<></>}
                </div>
             </div>

             <div className="checkout-page-body">
                {/*This displays the information about the items in the cart*/}
                <ul className="checkout-cart-info">
                   {
                      cart?.map((item, i) => (
                          <div className ="checkout-cart-book-item" key={item.id}>
                             <div className="checkout-cart-book-image" key = {i} >
                                <img src={getBookImageUrl(item.book)} alt="title" className ="checkout-cart-info-img"
                                     width="20%"
                                     height="20%"
                                />
                             </div>
                             <div className="checkout-cart-book-info">
                                <div className="checkout-cart-book-title">{ item.book.title }</div>
                                <div>
                                   <div className="checkout-cart-book-subtotal">
                                      {/*TO DO the total cost of this specific book displayed here*/}
                                      ${ (item.book.price * item.quantity).toFixed(2) }
                                   </div>
                                   <div className="checkout-cart-book-quantity">
                                      <button className="checkout-icon-button dec-button"
                                              onClick={() => {
                                                 dispatch({ type: CartTypes.REMOVE, book:item.book, id: item.book.bookId });
                                              }}
                                      >
                                         <i className="fas fa-minus-circle"><FontAwesomeIcon icon={faMinusCircle} /></i>
                                      </button>
                                      <button className="checkout-num-button">{ item.quantity }</button>
                                      <button  className="checkout-icon-button inc-button"      onClick={() => {
                                         dispatch({ type: CartTypes.ADD, book:item.book, id: item.book.bookId });
                                      }} >
                                         <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
                                      </button>
                                   </div>
                                </div>

                             </div>
                          </div>
                      )) }
                </ul>
             </div>
          </section>

       </main>
   )}

export default CheckoutPage;