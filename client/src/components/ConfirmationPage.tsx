import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";

// @ts-ignore
function formatExpirationDate(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // getMonth() 返回 0-11，代表1-12月
    const year = date.getFullYear();

    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedMonth}-${year}`;
}

function ConfirmationPage()
{
    const { orderDetails, dispatch} = useContext(OrderDetailsStore);

    console.log("test", orderDetails);
    const orderDate =  () => {
        let date = new Date(orderDetails.order.dateCreated);
        return ( date.toLocaleString());
    };

    return(
        <main>
        <div className="confirmationView">
            <div className="confirmation_title">
                <span>Confirmation #: 123456789</span>
                <span>{orderDate()}</span>
            </div>
            <ConfirmationTable />
            <table className="customer_info">
                <tr><td><b>Name:</b></td> <td>{orderDetails?.customer?.customerName}</td></tr>
                <tr><td><b>Address:</b></td> <td>{ orderDetails?.customer?.address }</td></tr>
                <tr><td><b>Email:</b></td> <td>{ orderDetails?.customer?.email }</td></tr>
                <tr><td><b>Phone:</b></td> <td>{ orderDetails?.customer?.phone }</td></tr>
                <tr><td><b>Credit Card:</b> **** **** **** {orderDetails?.customer?.ccNumber.slice(-4)}</td> <td>{formatExpirationDate(orderDetails?.customer?.ccExpDate)}</td></tr>
            </table>
            <div id="customerInfo"></div>
        </div>
        </main>
    )
}
export default ConfirmationPage;