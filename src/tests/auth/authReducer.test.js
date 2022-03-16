import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"

describe('Pruebas en authReducer', () => {
    test('Debe retornar el estado por defecto', () => {
        const initialState = {  // estado inicial
            logged: false
        }

        const state = authReducer( initialState, {} );  // llamo a la funcion reductora

        expect( state ).toEqual( initialState );  
    });

    test('Debe autenticar y colocar el "name" del usuario', () => {
        const initialState = {  // estado inicial
            logged: false
        }
        const action = { // accion
            type: types.login,
            payload: { 
                name: 'Marcelo'
            }
        }

        const auth = authReducer( initialState, action );  // llamo a la funcion reductora

        expect( auth ).toEqual(  // espero que el auth sea igual a lo que se espera
            {
                logged: true,
                name: 'Marcelo'
            }
        )
    });

    test('Debe borrar el nombre del usuario y logged en false', () => {
        const initialState = {  // estado inicial
            logged: true,
            name: 'Marcelo'
        };
        const action = {  // accion
            type: types.logout,
        };
        const auth = authReducer( initialState, action );  // llamo a la funcion reductora

        expect( auth ).toEqual( {  // espero que el auth sea el mismo
            logged: false
        } );
    })
})