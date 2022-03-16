import React from 'react';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/authContext';
import { mount } from 'enzyme';


describe('Pruebas en <AppRouter />', () => {
    test('Deberia mostrar el login si NO esta autenticado', () => {
        const contextValue = {  // Contexto controlado por nosotros
            user: {
                logged: false,  // si NO esta autenticado
            }
        };

        const wrapper = mount(  // se usa mount para poder usar el contexto
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login Screen' );
    }); 

    test('Deberia demostrar el componente de Marvel, si esta autenticado', () => {
        const contextValue = {  // Contexto controlado por nosotros
            user: {
                logged: true,  // SI esta autenticado
                name: 'Marco',
            }
        };
        
        const wrapper = mount(  // se usa mount para poder usar el contexto
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe( true );  // existe el navbar
    })
})

