import  Axios  from 'axios';
import { CART_EMPTY } from "../constants/cardConstants";
import { ORDER_LASTTEN_SUCCESS, ORDER_LASTTEN_FAIL, ORDER_LASTTEN_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order})

    try {
        const { userSignIn: {userInfo}} = getState();
        console.log(userInfo)
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order})
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems')
    }catch(error) {
        dispatch({type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const listOrder = () => async (dispatch) => {
    dispatch({ type: ORDER_LIST_REQUEST })

    try {
        const { data } = await Axios.get(`/api/orders`);

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error})
    }
    
    
}

export const detailsOrder = (orderID) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderID })

    try {
        const { data } = await Axios.get(`/api/orders/${orderID}`);
        console.log(data);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error})
    }
}

export const lastTenOrders = () => async (dispatch) => {
    dispatch({ type: ORDER_LASTTEN_REQUEST})

    try {
        const { data } = await Axios.get('/api/orders/lasttenlist')
        dispatch({ type: ORDER_LASTTEN_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_LASTTEN_FAIL, payload: error.message})
    }
}