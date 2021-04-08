import { FAILED_LOGIN, IS_USER_LOGGED_IN, LOGOUT, SUCCES_LOGIN } from "./actions"

export interface IAuthorizationSate{
    isUserLoggedIn:boolean
} 
export const INITAL_AUTHORIZATION_SATE:IAuthorizationSate={
    isUserLoggedIn:false
}

export function rootReducer(authorizationState:IAuthorizationSate,action):IAuthorizationSate{
    
    switch(action.type){
        case SUCCES_LOGIN:{
            sessionStorage.setItem(IS_USER_LOGGED_IN,"true")
            return authorizationState
        }
        case LOGOUT||FAILED_LOGIN:{
            sessionStorage.setItem(IS_USER_LOGGED_IN,"")
            return authorizationState
        }
    }

    return authorizationState
}