import React, { useEffect, useReducer } from 'react';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';

import { AppRouter } from "./routers/AppRouter"

const init = () => {  // se declara la funcion init para el useReducer
    return JSON.parse( localStorage.getItem('user') ) || { logged: false };  // se obtiene el usuario del localStorage o se inicializa el logged en false
};

export const HeroesApp = () => {
    const [user, dispatch] = useReducer( authReducer, {}, init );  // se usa el reducer para el contexto de autenticacion

    useEffect(() => {
        if ( !user ) return  // si no hay usuario, no se ejecuta
        localStorage.setItem('user', JSON.stringify(user));  // se guarda el usuario en el localStorage
    }, [ user ]);
    

    return (
        <AuthContext.Provider value={{  // se exporta el contexto de autenticacion
            user,
            dispatch,
        }}>
            <AppRouter />
        </AuthContext.Provider>
    );
}
