import React from 'react';
import { Navbar } from '../../../components/ui/Navbar';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/authContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const original = jest.requireActual('react-router-dom');
    return {
        ...original,
        useNavigate: () => mockNavigate,
    };
});

describe('Pruebas en <Navbar />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Pedro',
            logged: true,
        },
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Deberia mostrarse correctamente', () => {
        // Pedro en el Authcontext
        // Snapshot
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pedro');
    });

    test('Debe llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {
        // hacer un mock del navigate y el dispatch
        wrapper.find('button').prop('onClick')();  // se dispara el evento onClick del boton
        expect( contextValue.dispatch ).toHaveBeenCalledWith({ type: types.logout });  // se dispara la accion
        expect( mockNavigate ).toHaveBeenCalledWith('/login', { replace: true });  // replace: true para que no vuelva a la ruta anterior
    })
})