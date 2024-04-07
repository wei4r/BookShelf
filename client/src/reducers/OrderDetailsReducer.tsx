import { Order, Customer, LineItem, BookItem, OrderDetails } from "../my_types";

// 定義 action 類型
export const OrderDetailsTypes = {
    UPDATE: 'UPDATE',
    CLEAR: 'CLEAR'
};


interface UpdateOrderDetailsAction {
    type: typeof OrderDetailsTypes.UPDATE;
    payload: OrderDetails;
}

interface ClearOrderDetailsAction {
    type: typeof OrderDetailsTypes.CLEAR;
}

type OrderDetailsActions = UpdateOrderDetailsAction | ClearOrderDetailsAction;

const initialOrderDetailsState: OrderDetails = {
    order: { orderId: 0, amount: 0, dateCreated: 0, confirmationNumber: 0, customerId: 0 },
    customer: { customerName: '', address: '', phone: '', email: '', ccNumber: '', ccExpDate: 0},
    books: [],
    lineItems: []
};


export const orderDetailsReducer = (state: OrderDetails = initialOrderDetailsState, action: OrderDetailsActions): OrderDetails => {
    switch (action.type) {
        case OrderDetailsTypes.UPDATE:
            const updateAction = action as UpdateOrderDetailsAction; // 確保 action 是 UpdateOrderDetailsAction 類型
            return {
                ...state,
                ...updateAction.payload
            };
        case OrderDetailsTypes.CLEAR:
            return initialOrderDetailsState;
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
};