import React, { useContext } from 'react'
import { AuthContext } from '../../auth/authContext';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { types } from '../../types/types';

export const Navbar = () => {

    const navigate = useNavigate();  // permite navegar entre las rutas
    const { dispatch } = useContext(AuthContext);  // !se debe llamar fuera

    const handleLogout = () => {
        const action = {
            type: types.logout,
        }

        dispatch(action);  // se dispara la accion

        navigate('/login', { 
            replace: true,  // evita que regrese a la ruta anterior
        })
    };

    // Como el navbar es un componente que se renderiza en todas las rutas, se usa el contexto de autenticacion para obtener el usuario
    const authContext = useContext(AuthContext);  // se obtiene el contexto de autenticacion
    const { user } = authContext;  // se obtiene el usuario del contexto
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/" 
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } 
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-info'>
                        { user.name }
                    </span>

                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}