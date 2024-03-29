import { ORDER_STATUS_REQUEST, ORDER_STATUS_SUCCESS, ORDER_STATUS_FAIL, ORDER_STATUS_RESET,ORDER_HISTORY_SUCCESS, ORDER_HISTORY_FAIL, ORDER_HISTORY_REQUEST, ORDER_LASTTEN_REQUEST, ORDER_LASTTEN_SUCCES, ORDER_LASTTEN_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_LASTTEN_SUCCESS } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST: 
            return { loading: true};
        case ORDER_CREATE_SUCCESS: 
            return { loading: false, success: true, order: action.payload}
        case ORDER_CREATE_FAIL: 
            return { loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderHistoryReducer = (state = {loading: true, order: []}, action) => {
    switch(action.type) {
        case ORDER_HISTORY_REQUEST:
            return { loading: true};
        case ORDER_HISTORY_SUCCESS:
            return { loading: false, order: action.payload};
        case ORDER_HISTORY_FAIL:
            return { loading: false, error: action.payload}

        default: return state
}
}
export const statusOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_STATUS_REQUEST: 
            return { loading: true};
        case ORDER_STATUS_SUCCESS:
            return { loading: false, success: true};
        case ORDER_STATUS_FAIL:
            return { loading: false, error: action.payload};
        case ORDER_STATUS_RESET:
            return { order: {}};
        default: return state;
    }
}
export const orderListReducer = (state = { loading: true, orders: []}, action) => {
    switch(action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true};
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload};
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload};
        default: return state
    }
}

export const orderDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true};
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, orders: action.payload};
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload};
        default: return state
    }
}

export const lastTenOrders = (state = { loading: true, orders: []}, action) => {
    switch(action.type) {
        case ORDER_LASTTEN_REQUEST:
            return { loading: true};
        case ORDER_LASTTEN_SUCCESS:
            return { loading: false, orders: action.payload}
        case ORDER_LASTTEN_FAIL:
            return { loading: false, error: action.payload}
        default: return state;
    }
}