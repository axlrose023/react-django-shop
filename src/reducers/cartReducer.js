import {
    CART_ADD_ITEM,
    CART_CLEAR_ITEMS,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";


export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const existingItemIndex = state.cartItems
                ? state.cartItems.findIndex((x) => x.product === newItem.product)
                : -1;

            if (existingItemIndex !== -1) {
                // If the item already exists, replace it with the new one
                state.cartItems[existingItemIndex] = newItem;
            } else {
                // If it's a new item, add it to the cartItems array
                state.cartItems = state.cartItems || [];
                state.cartItems.push(newItem);
            }

            return {
                ...state,
                cartItems: [...state.cartItems], // Ensure a new array reference for React to detect changes
            };

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}
