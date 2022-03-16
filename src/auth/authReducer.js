import { types } from "../types/types";

// const state = {
//     name: 'Marco',
//     logged: true,
// }

// const loginAction = {
//     type: types.login,
//     payload: {
//         name: 'Marco',
//         email: 'marco@mail.com,'
//     }
// }

export const authReducer = ( state = {}, action ) => {  // funcion reductora
    switch ( action.type ) {
        case types.login:  // si el tipo es login
            return {
                ...action.payload,  // retorno el payload con el nombre
                logged: true,
            }
        case types.logout:  // si el tipo es logout
            return {
                logged: false,
            }
        default:
            return state;  // si no hay ninguna accion, devuelvo el estado
    }
};