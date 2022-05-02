import {REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAIL, REVIEW_LIST_REQUEST, REVIEW_LIST_SUCCESS, REVIEW_LIST_FAIL, PRODUCT_REVIEWADD_REQUEST, PRODUCT_REVIEWADD_SUCCESS, PRODUCT_REVIEWADD_FAIL,PRODUCT_REVIEWADD_RESET,PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_LISTFULL_REQUEST, PRODUCT_LISTFULL_SUCCESS, PRODUCT_LISTFULL_FAIL, CATEGORY_LIST_FAIL, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_REQUEST, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL, CATEGORIES_LIST_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,  PRODUCT_EDIT_FAIL,  PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_CREATE_RESET,  PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCES, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_FAIL,  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants';

export const productListReducer = (state = { loading:true, products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true};
        case PRODUCT_LIST_SUCCES: 
            return { loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload}
        default: 
            return state;
    }
}
export const searchReducer = ( state = { loading: true, keyword: []}, action) => {
    switch(action.type) {
        case PRODUCT_SEARCH_REQUEST:
            return { loading: true };
        case PRODUCT_SEARCH_SUCCESS:
            return { loading: false, keyword: action.payload};
        case PRODUCT_SEARCH_FAIL:
            return { loading: false, error: action.payload};
        default: return state
    }
}
export const productFullReducer = ( state = {loading: true, products: []}, action) => {
    switch(action.type) {
        case PRODUCT_LISTFULL_REQUEST:
            return { loading: true};
        case PRODUCT_LISTFULL_SUCCESS:
            return { loading: false, products: action.payload}
        case PRODUCT_LISTFULL_FAIL:
            return { loading: false, error: action.payload}
        default: return state;
    }
}

export const productDetailsReducer = (state = { loading: true}, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state
    }
}
export const productCreateReducer = ( state = {}, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload};
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload};
        case PRODUCT_CREATE_RESET:
            return {}
        default: 
            return state;
    }
}


export const productDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return  { loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true};
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.paylaod }
        default: return state;
    }
}

export const productEditReducer = (state = { loading: true}, action) => {
    switch(action.type) {
        case PRODUCT_EDIT_REQUEST:
            return { loading: true };
        case PRODUCT_EDIT_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_EDIT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state
    }
}

export const productUpdateReducer = ( state = {}, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload};
        case PRODUCT_UPDATE_RESET:
            return { product: {}}
        default: 
            return state;
    }
}

export const categoriesListReducer = (state = { loading: true, categories: []}, action) => {
    switch(action.type) {
        case CATEGORIES_LIST_REQUEST:
            return { loading: true};
        case CATEGORIES_LIST_SUCCESS:
            return { loading: false, categories: action.payload};
        case CATEGORIES_LIST_FAIL:
            return { loading: false, error: action.payload}
        default : return state;
    }
}

export const categoryListReducer = (state = { loading: true}, action) => {
    switch(action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true}
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload}
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload}
        default: return state
    }
}

export const reviewAddReducer = (state = { loading: true,}, action) => {
    switch(action.type) {
        case PRODUCT_REVIEWADD_REQUEST:
            return { loading: true};
        case PRODUCT_REVIEWADD_SUCCESS:
            return { loading: false, success: true}
        case PRODUCT_REVIEWADD_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_REVIEWADD_RESET:
            return {}
        default: return state;
    }
}

export const listReviewReducer = (state = {loading: true, reviews: []}, action) => {
    switch(action.type) {
        case REVIEW_LIST_REQUEST:
            return { loading: true};
        case REVIEW_LIST_SUCCESS:
            return { loading: false, reviews: action.payload};
        case REVIEW_LIST_FAIL:
            return { loading: false, error: action.payload}
        default: return state
    }
}

export const reviewDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case REVIEW_DELETE_REQUEST:
            return { loading: true};
        case REVIEW_DELETE_SUCCESS:
            return { loading: false, success: true};
        case REVIEW_DELETE_FAIL:
            return { loading: false, error: action.payload}
        default: return state;
    }
}

