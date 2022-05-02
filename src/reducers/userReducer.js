
import { USER_LASTTEN_REQUEST, USER_LASTTEN_SUCCESS, USER_LASTTEN_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_ADD_RESET, USER_ADD_REQUEST, USER_ADD_SUCCESS, USER_ADD_FAIL, USER_UPDATE_RESET, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from '../constants/userConstants'

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS: 
        console.log(action)

            return { loading: false, userInfo: action.payload}; // PAYLOAD AKCIJA UZIMA INFO IZ USERACTION DISPATCH({ TYPE: USER_SIGNIN_SUCCES, PAYLOAD: data})
        case USER_SIGNIN_FAIL:
            console.log(action)

        return { loading: false, error: action.payload};
        case USER_SIGNOUT: 
            return {};
        default: 
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS: 
        console.log(action)

            return { loading: false, userInfo: action.payload}; // PAYLOAD AKCIJA UZIMA INFO IZ USERACTION DISPATCH({ TYPE: USER_SIGNIN_SUCCES, PAYLOAD: data})
        case USER_REGISTER_FAIL:
            console.log(action)

        return { loading: false, error: action.payload};
        default: 
            return state
    }
}

export const usersListReducer = (state = {loading: true, users: []}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true};
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload};
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload};
        default: 
            return state;
    }
}

export const userEditReducer = (state = { loading: true}, action) => {
    switch(action.type) {
        case USER_EDIT_REQUEST:
            return { loading: true};
        case USER_EDIT_SUCCESS:
            return { loading: false, user: action.payload}
        case USER_EDIT_FAIL:
            return { loading: false, error: action.payload}
        default: 
            return state;
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true};
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true}
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case USER_UPDATE_RESET: 
            return { user: []}
        default : return state;
    }
}

export const userAddReducer = (state ={}, action) => {
    switch(action.type) {
        case USER_ADD_REQUEST:
            return { loading: true};
        case USER_ADD_SUCCESS:
            return { loading: false, success: true, userAdd: action.payload}
        case USER_ADD_FAIL:
            return { loading: false, error: action.payload}
        case USER_ADD_RESET: 
            return {}
        default : return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true};
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true};
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload}
        default: return state;
    }
}

export const lastTenReducer = (state = { loading: true, lastTen: []}, action) => {
    switch(action.type) {
        case USER_LASTTEN_REQUEST: 
            return { loading: true}
        case USER_LASTTEN_SUCCESS:
            return { laoding: false, lastTen: action.payload}
        case USER_LASTTEN_FAIL:
            return { loading: false, error: action.payload}
        default: return state
    }
}
