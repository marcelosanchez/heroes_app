import React, { useContext } from 'react'
import { AuthContext } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { types } from '../../types/types';

export const LoginScreen = () => {

    const navigate = useNavigate();  // permite navegar entre las rutas
    const { dispatch } = useContext(AuthContext);  // !se debe llamar fuera

    const handleLogin = () => {
        const action = {
            type: types.login,
            payload: { name: 'Marcelo' }
        }
        
        dispatch(action);  // se dispara la accion
        
        const lastPath = localStorage.getItem('lastpath') || '/marvel';  // se obtiene la ultima ruta visitada
        navigate(lastPath, { 
            replace: true,  // evita que regrese a la ruta anterior
        })
    };

    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <hr/>

            <button
                className='btn btn-primary'
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
