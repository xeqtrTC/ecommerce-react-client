import Axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from "../constants/cardConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/products/${productId}`);
    console.log(data)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data[0].name,
            image: data[0].image,
            price: data[0].price,
            countInStock: data[0].countInStock,
            product: data[0].id,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const removeFromCart =(productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS, payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
    console.log(data);
}
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
}