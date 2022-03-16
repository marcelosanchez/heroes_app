import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>  // El componente Navigate es una función que se utiliza para redireccionar
}));

describe('Pruebas en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();  // permite guardar el valor en el localStorage

    test('Debe mostrar el componente si esta autenticado y guardar en el localStorage', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Marcelo',
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.text().trim() ).toBe('Private Component');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastpath', '/');  // se guarda la ultima ruta visitada
    })

    test('Debe bloquear el componente si no esta autenticado', () => {
        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.text().trim() ).toBe('Saliendo de aqui');
    })
})