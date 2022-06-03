import  Axios  from 'axios';
import { CART_EMPTY } from "../constants/cardConstants";
import { ORDER_STATUS_REQUEST,  ORDER_STATUS_SUCCESS,  ORDER_STATUS_FAIL,  ORDER_STATUS_RESET, ORDER_HISTORY_REQUEST , ORDER_HISTORY_SUCCESS, ORDER_HISTORY_FAIL,   ORDER_LASTTEN_SUCCESS, ORDER_LASTTEN_FAIL, ORDER_LASTTEN_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order})

    try {
        const { userSignIn: {userInfo}} = getState();
        console.log(userInfo)
        const { data } = await Axios.post('https://evening-bayou-13792.herokuapp.com/api/orders', order, {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        });
        console.log(order);
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order})
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems')
    }catch(error) {
        dispatch({type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}
export const statusOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_STATUS_REQUEST})
    try {
            const { userSignIn : {userInfo}} = getState()

            const { data } = await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/orders/update/${order.orderID}`, order,  {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            dispatch({type: ORDER_STATUS_SUCCESS, payload: data})
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})


    } catch (error ) {
            dispatch({type: ORDER_STATUS_FAIL, payload: error.message})
    }

}

export const orderHistory = (name) => async (dispatch, getState) => {
    dispatch({type: ORDER_HISTORY_REQUEST})
    console.log(name);
    try {
            const { userSignIn : {userInfo}} = getState()

            const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/orders/orderhistory/${name}`, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            dispatch({type: ORDER_HISTORY_SUCCESS, payload: data})

    } catch (error ) {
            dispatch({type: ORDER_HISTORY_FAIL, payload: error.message})
    }

}

export const listOrder = () => async (dispatch) => {
    dispatch({ type: ORDER_LIST_REQUEST })

    try {
        const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/orders`);

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error})
    }
    
    
}

export const detailsOrder = (orderID) => async (dispatch) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderID })

    try {
        const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/orders/${orderID}`);
        console.log(data);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error})
    }
}

export const lastTenOrders = () => async (dispatch) => {
    dispatch({ type: ORDER_LASTTEN_REQUEST})

    try {
        const { data } = await Axios.get('https://evening-bayou-13792.herokuapp.com/api/orders/lasttenlist')
        dispatch({ type: ORDER_LASTTEN_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: ORDER_LASTTEN_FAIL, payload: error.message})
    }
}