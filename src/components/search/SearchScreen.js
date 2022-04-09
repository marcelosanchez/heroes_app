import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
    const navigate = useNavigate();  // permite navegar entre las rutas
    const location = useLocation();  // permite obtener la ruta actual

    const { q = '' } = queryString.parse( location.search );  // obtiene los parametros de la ruta


    const [ formValues, handleInputChange ] = useForm( {  // uso el custom hook
        searchText: q,  // valor por defecto
    } );

    const { searchText } = formValues;  // desestructurando

    const heroesFiltered = useMemo( () => {
        return getHeroesByName( q );
    } , [ q ] );  // memoiza el resultado

    const handleSearch = (e) => {
        e.preventDefault(); 
        navigate(`?q=${ searchText }`);
    }

    return (
        <>
            <h1>Search Results</h1>
            <hr />

            <div className='row'>

                <div className='col-lg-5'>
                    <h4>Search</h4>
                    <hr/>
                    <form onSubmit={ handleSearch }>
                        <input
                            type='text'
                            placeholder='Search hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button 
                            className='btn btn-outline-primary mt-1'
                            type='submit' 
                        > 
                            Search
                        </button>
                    </form>
                </div>

                <div className='col-lg-7'>
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q === '') 
                            ? <div className='alert alert-info'>Please enter a search term</div>
                            : ( heroesFiltered.length === 0 )
                                && <div className='alert alert-danger'>No results found: { q }</div>
                    }   


                    <ul className='list-group'>
                        {
                            heroesFiltered.map( hero => (
                                <HeroCard 
                                    key={ hero.id }
                                    { ...hero }
                                />
                            ) )
                        }
                    </ul>
                </div>

            </div>

        </>
    )
}
