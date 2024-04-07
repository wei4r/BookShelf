import React, {createContext, Dispatch, useEffect, useReducer} from "react";
import { orderDetailsReducer } from "../reducers/OrderDetailsReducer";
import { OrderDetails } from "../my_types";

const initialOrderDetailsState: OrderDetails = {
    order: { orderId: 0, amount: 0, dateCreated: 0, confirmationNumber: 0, customerId: 0 },
    customer: { customerName: '', address: '', phone: '', email: '', ccNumber: '', ccExpDate: 0},
    books: [],
    lineItems: []
};

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails;
    dispatch: Dispatch<any>;
}>({
    orderDetails: initialOrderDetailsState,
    dispatch: () => null
});

OrderDetailsStore.displayName = 'OrderDetailsContext';

export const OrderDetailsContext = ({ children }: { children: React.ReactNode }) => {

    const [orderDetails, dispatch] = useReducer(orderDetailsReducer, initialOrderDetailsState);

    useEffect(() => {
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }, [orderDetails]);


    return (
        <OrderDetailsStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
};
