import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';


export const PrivateRoute = ( { children } ) => {

    const { user } = useContext(AuthContext);

    const location = useLocation();  // se obtiene la ruta actual
    const lastPath = location.pathname + location.search;  // se obtiene la ruta actual con query string

    useEffect(() => {
        localStorage.setItem('lastpath', lastPath);  // se guarda la ultima ruta visitada
    }, [ location ]);  // se ejecuta solo cuando la ruta cambia

    return (
            user.logged 
            ? children 
            : <Navigate to='/login' />
    )
}
