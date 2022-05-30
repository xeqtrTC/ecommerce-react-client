import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import  thunk  from 'redux-thunk';
import { CartReducer } from '../../reducers/cartReducers';
import   { reviewDeleteReducer, listReviewReducer, reviewAddReducer, searchReducer, productFullReducer, categoryListReducer, categoriesListReducer, productCreateReducer, productListReducer, productDetailsReducer, productDeleteReducer, productEditReducer, productUpdateReducer }  from '../../reducers/productReducers'
import { lastTenReducer, userDeleteReducer, userAddReducer, userUpdateReducer, userSigninReducer, userRegisterReducer, usersListReducer, userEditReducer } from '../../reducers/userReducer';
import { lastTenOrders, orderDetailsReducer, orderCreateReducer, orderListReducer } from '../../reducers/orderReducers';
const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        aboutOrder: localStorage.getItem('aboutOrder') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: 'On hand'
    
    },

};
console.log(initialState);


const composeEnhaner = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    productList: productListReducer,
    productListFull: productFullReducer,
    productDetails: productDetailsReducer,
    reviewAdd: reviewAddReducer,
    reviewList: listReviewReducer,
    reviewDelete: reviewDeleteReducer,
    cart: CartReducer,
    search: searchReducer,
    userSignIn: userSigninReducer,
    userRegister: userRegisterReducer,
    userAdd: userAddReducer,
    usersList: usersListReducer,
    userEdit: userEditReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    lastTen: lastTenReducer,
    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderLastTen: lastTenOrders,
    categoryList: categoryListReducer,
    categoriesList: categoriesListReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
})



const store = createStore(reducer, initialState, composeEnhaner(applyMiddleware(thunk)))

export default store;