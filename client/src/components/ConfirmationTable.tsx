import { asDollarsAndCents } from "../utils";

import { BookItem, OrderDetails } from '../my_types'

import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {useContext} from "react";
import '../assets/css/Confirmation.css'

function ConfirmationTable() {
  const { orderDetails} = useContext(OrderDetailsStore);

    // @ts-ignore
    function calculateTax(total) {
        const taxRate = 0.06; // 6% tax rate
        return total * taxRate;
    }
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
      return orderDetails.books[index];
  };
    const totalPrice = orderDetails.lineItems.reduce((total, lineItem) => {
        const book = orderDetails.books.find(book => book.bookId === lineItem.bookId);
        return total + (book ? book.price * lineItem.quantity : 0);
    }, 0);
  return (
      <table className="confirmation_table">
          <tr className="confirmation_tr">
              <td className="confirmation_td"><b>Book Name</b></td>
              <td className="price_quantity"><span><b>Quantity</b></span><span><b>Subtotal</b></span></td>
          </tr>
          {
              orderDetails.books?.map((book, i) => {
                  // 根據 bookId 查找對應的 lineItem 來獲取數量
                  const lineItem = orderDetails.lineItems.find(item => item.bookId === book.bookId);
                  const quantity = lineItem ? lineItem.quantity : 0;

                  return (
                      <tr className="confirmation_tr" key={i}>
                          <td className="confirmation_td">
                              {book.title}
                          </td>

                          <td className="price_quantity">
                            <span className="book_quantity">{quantity}</span>
                            <span>{asDollarsAndCents(quantity*book.price * 100)}</span>
                          </td>
                      </tr>
                  );
              })
          }
          <tr className="confirmation_tr"> <br/></tr>

          <tr className="confirmation_tr">
              <td className="confirmation_td"><b>Sub Total :</b></td>
              <td className="confirmation_td"><b>{asDollarsAndCents(totalPrice * 100)}</b></td>
          </tr>
          <tr className="confirmation_tr">
              <td className="confirmation_td"><b>Tax:</b></td>
              <td className="confirmation_td"><b>${calculateTax(totalPrice)}</b></td>
          </tr>
          <tr className="confirmation_tr">
              <td className="confirmation_td"><b>Total :</b></td>
              <td className="confirmation_td"><b>{asDollarsAndCents(totalPrice * 100+calculateTax(totalPrice)*100)}</b></td>
          </tr>
      </table>

  )}

export default ConfirmationTable;