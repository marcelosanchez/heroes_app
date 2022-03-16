import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();  // mock del navigate

jest.mock('react-router-dom', () => {  // mock del router de react-router-dom
    const original = jest.requireActual('react-router-dom');  // requerimos el original
    return {
        ...original,
        useNavigate: () => mockNavigate,
    };
});

describe('Pruebas en el <LoginScreen />', () => {
    const contextValue = {
        dispatch: jest.fn(),  // mock del dispatch
        user: {
            logged: false,
        },
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    test('Debe de mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe realizar el dispatch y la navegacion', () => {
        const handleClick = wrapper.find('button').prop('onClick');  // se obtiene el onClick del boton que es una funcion
        handleClick();  // se dispara el evento onClick del boton
        
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Marcelo',
            }
        });  // se dispara la accion
        
        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', { replace: true });  // replace: true para que no vuelva a la ruta anterior
        
        localStorage.setItem('lastpath', '/dc');  // se guarda la ruta en el localStorage
        
        handleClick();  // se dispara el evento onClick del boton
        
        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true });  // replace: true para que no vuelva a la ruta anterior

    })
})