import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();  // mock del navigate

jest.mock('react-router-dom', () => {  // mock del router de react-router-dom
    const original = jest.requireActual('react-router-dom');  // requerimos el original
    return {
        ...original,
        useNavigate: () => mockNavigate,
    };
});

describe('Pruebas en <HeroScreen />', () => {
    test('No debe mostrar el HeroScreen si no hay un heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No heroe page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find('h1').text().trim() ).toBe('No heroe page');
    });

    test('Debe mostrar un heroe si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No heroe page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        expect( wrapper.find('.row').exists() ).toBe( true ); // debe mostrar el componente
    });

    test('Debe regresar a la pantalla anterior', () => {
        // llamar navigate -1
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();  // llamamos al boton 
        expect( mockNavigate ).toHaveBeenCalledWith(-1);  // debe llamar al navigate con el parametro -1
    })

    test('Debe mostrar la pagina por defecto si no tiene heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123412']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No heroe page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.text().trim() ).toBe('No heroe page');
    })
})