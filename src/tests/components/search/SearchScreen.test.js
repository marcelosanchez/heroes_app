import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();  // mock de la funcion navigate

jest.mock('react-router-dom', () => ({  // mock de react-router-dom
    ...jest.requireActual('react-router-dom'),  // importa todo lo que hay en react-router-dom
    useNavigate: () => mockNavigate,  // modifica la funcion navigate para llamarla en el test
}))

describe('Pruebas en <SearchScreen />', () => {
    test('Deberia mostrarse correctamente', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Please enter a search term');
    })

    test('Deberia mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('input').prop('value') ).toBe('batman');
    });

    test('Deberia mostrar un error si no se encuentra el heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No results found: batman123');
        // Tarea
        // No hay resultados: batman123
    });

    test('Debe llamar el navigate a la nueva URL', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {  // simulo el evento change del input
            target: {  // simulo el target del evento
                name: 'searchText',  // nombre del input
                value: 'batman',  // valor del input
            }
        });

        wrapper.find('form').prop('onSubmit')({  // simulo el evento submit del form
            preventDefault: () => {},  // simulo el preventDefault del evento
        });

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');  // verifico que se llame el navigate
    });
})