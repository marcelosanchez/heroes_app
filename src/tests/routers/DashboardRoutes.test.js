import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from "enzyme"
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/authContext';

describe('Pruebas en <DashboardRoutes />', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'Pedro',
        }
    }

    test('Debe mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                {/* El MemoryRouter nos permite simular el comportamiento de una ruta en una prueba. */}
                <MemoryRouter initialEntries={ ['/'] }>  {/* initialEntries es un array de strings que indica la ruta inicial. */}
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pedro');
        expect( wrapper.find('h1').text().trim() ).toBe('Marvel Screen');
    });

    test('Debe mostrarse correctamente DC', () => {
        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                {/* El MemoryRouter nos permite simular el comportamiento de una ruta en una prueba. */}
                <MemoryRouter initialEntries={ ['/dc'] }>  {/* initialEntries es un array de strings que indica la ruta inicial. */}
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DC Screen');
    });
})