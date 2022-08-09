import Axios from 'axios';
import {USER_LASTTEN_REQUEST, USER_LASTTEN_SUCCESS, USER_LASTTEN_FAIL, USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_DELETE_SUCCESS, USER_ADD_REQUEST, USER_ADD_SUCCESS, USER_ADD_FAIL, USER_UPDATE_REQUEST , USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const signin = (name, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { name, password}})

    try {
        const { data } = await Axios.post('https://evening-bayou-13792.herokuapp.com/api/users/signin', {name, password})
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data})
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        
        dispatch({ type:USER_SIGNIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, })
                                                // Proveri da li ima responsa, proveri da li ima response.data.message ako nema vrati generali error
    }


}

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { name, email, password}})

    try {
        const { data } = await Axios.post('https://evening-bayou-13792.herokuapp.com/api/users/register', {name, email, password})
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data})
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data})

        console.log(data)
        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        
        dispatch({ type:USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, })
                                                // Proveri da li ima responsa, proveri da li ima response.data.message ako nema vrati generalni error
    }


}
export const usersList = () => async (dispatch) => {
    dispatch({type: USER_LIST_REQUEST})
    try {
        const { data } = await Axios.get('https://evening-bayou-13792.herokuapp.com/api/users/');
        console.log(data);
        dispatch({ type: USER_LIST_SUCCESS, payload: data})

    }catch(error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message})
    }

}
export const editUser = (id) => async( dispatch) => {
    dispatch({ type: USER_EDIT_REQUEST, payload: id})

    try {
        const  { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/users/${id}`);

        dispatch({ type: USER_EDIT_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: USER_EDIT_FAIL, payload: error.message})
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({type: USER_UPDATE_REQUEST})
    const { userSignIn: {userInfo},} = getState();

    try {
        const { data } = await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/users/update/${user.id}`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        console.log(data);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data})
        dispatch({ type: USER_EDIT_SUCCESS, payload: data})
    } catch(error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: USER_UPDATE_FAIL, payload: message})

    }
}
export const addUser = (name, email, password) => async (dispatch, getState) => {
    dispatch({ type: USER_ADD_REQUEST, payload: { name, email, password}})
    const { userSignIn: {userInfo} } = getState();


    try {
        const { data } = await Axios.post('https://evening-bayou-13792.herokuapp.com/api/users/register', {name, email, password}, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: USER_ADD_SUCCESS, payload: data})

    } catch(error) {
        dispatch({ type:USER_ADD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, })
    }


}

export const deleteUser = (id) => async (dispatch, getState) => {
    dispatch({type: USER_DELETE_REQUEST})
    const { userSignIn: {userInfo},}  = getState();

    try {
        await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/users/userremove/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: USER_DELETE_SUCCESS})
    } catch(error) {
        dispatch({ type: USER_ADD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}

export const lastTenListUsers = () => async (dispatch) => {
    dispatch({type: USER_LASTTEN_REQUEST})
    
    try {
        const { data } = await Axios.get('https://evening-bayou-13792.herokuapp.com/api/users/listten')
        dispatch({ type: USER_LASTTEN_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: USER_LASTTEN_FAIL, payload: error})
    }
}



export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('shippingAddress');

    dispatch({ type: USER_SIGNOUT})
}