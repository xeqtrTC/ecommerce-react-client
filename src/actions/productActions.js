import {  REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAIL, REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS, REVIEW_LIST_FAIL, PRODUCT_REVIEWADD_REQUEST, PRODUCT_REVIEWADD_SUCCESS, PRODUCT_REVIEWADD_FAIL, PRODUCT_REVIEWADD_RESET, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_LISTFULL_REQUEST, PRODUCT_LISTFULL_SUCCESS, PRODUCT_LISTFULL_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL, CATEGORIES_LIST_REQUEST, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL, PRODUCT_EDIT_REQUEST,  PRODUCT_EDIT_SUCCESS,  PRODUCT_EDIT_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCES, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import Axios from 'axios'
export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('https://evening-bayou-13792.herokuapp.com/api/products');
        dispatch({type: PRODUCT_LIST_SUCCES, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: error.message
        })
    }
}

export const listFullProducts = () => async( dispatch) => {
    dispatch({ type: PRODUCT_LISTFULL_REQUEST})

    try {
        const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/products/list`)
        dispatch({ type: PRODUCT_LISTFULL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: PRODUCT_LISTFULL_FAIL, payload: error.message})
    }
}

export const searchProducts = (keyword) => async (dispatch) => {
    dispatch({ type: PRODUCT_SEARCH_REQUEST});
    try {
        const { data } = await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/products/search`, {keyword})
        dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error.message})
    }
}


export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    try {
        const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/products/${productId}`);
        console.log(data);

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
} 
export const createProduct = (name, description, countInStock, price, category, brand, image) => async (dispatch, getState) => {
    dispatch({type : PRODUCT_CREATE_REQUEST});
    const { userSignIn: {userInfo},} = getState();

    try {
        const { data } = await Axios.post('https://evening-bayou-13792.herokuapp.com/api/products', {name, description, countInStock, price, category, brand, image}, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product})
    } catch( error ) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_CREATE_FAIL, payload: message })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    dispatch({type : PRODUCT_DELETE_REQUEST});
    const { userSignIn: {userInfo},} = getState();

    try {
            await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/products/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS})
    } catch( error ) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_DELETE_FAIL, payload: message })
    }
}

export const editProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCT_EDIT_REQUEST, payload: productId})
    try {
        const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/products/${productId}`);
        console.log(data);

        dispatch({type: PRODUCT_EDIT_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: PRODUCT_EDIT_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
} 
export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({type : PRODUCT_UPDATE_REQUEST});
    const { userSignIn: {userInfo},} = getState();

    try {
        const { data } = await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/products/update/${product.id}`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        console.log(data);
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data})
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data})

    } catch( error ) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: message })
    }
}

export const categoryList = (category) => async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST, payload: category});

    try {
        const { data } = await Axios.get(`https://evening-bayou-13792.herokuapp.com/api/products/category/${category}`)
        console.log(data);
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message})
    }
}

export const addReview = (productId, review) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_REVIEWADD_REQUEST})
    const { userSignIn: {userInfo},} = getState();

    try {
         await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/products/addreview/${productId}`, {review}, {
                headers: { Authorization: `Bearer ${userInfo.token}`}
        });
        console.log(review);
        dispatch({ type: PRODUCT_REVIEWADD_SUCCESS})
    } catch (error) {
        dispatch({ type: PRODUCT_REVIEWADD_FAIL, payload: error.message})
    }
}

export const listOfReview  = () => async (dispatch) => {
    dispatch({type: REVIEW_LIST_REQUEST});
    try {
        const { data } = await Axios.get('https://evening-bayou-13792.herokuapp.com/api/products/listreview')

        dispatch({type: REVIEW_LIST_SUCCESS, payload: data})
    } catch (error)  {
        dispatch({ type: REVIEW_LIST_FAIL, payload: error.message})
    }
}

export const deleteReview = (id) => async (dispatch, getState) => {
    dispatch({ type: REVIEW_DELETE_REQUEST})
    const { userSignIn: {userInfo}} = getState();

    try {
        await Axios.post(`https://evening-bayou-13792.herokuapp.com/api/products/listreviewdelete/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`}
        })
        dispatch({ type: REVIEW_DELETE_SUCCESS})
    } catch (error) {
        dispatch({ type: REVIEW_DELETE_FAIL, payload: error.message})
    }
}

