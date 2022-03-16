import React, { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';
import { heroImages } from '../../helpers/heroImages';

// import batman from '../../assets/heroes/dc-batman.jpg';  // estatico
// const heroImages = require.context('../../assets/heroes', true); // dinamico

export const HeroScreen = () => {

    const { heroId } = useParams();  // heroId es el parametro de la url
    const navigate = useNavigate();  // permite navegar entre las rutas

    const hero = useMemo(() => {
        return getHeroById(heroId); 
    }, [heroId]); // solo se ejecuta cuando heroId cambia
    
    if( !hero ) {
        return <Navigate to='/' />;  // Redirecciona a la pagina de inicio
    }
    
    const { 
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    // const imagePath = `../assets/${id}.jpg`;  // Desde la carpeta /assets
    // const imagePath = batman;

    const handleReturn = () => {
        navigate( -1 );  // navega hacia atras
    }

    return (
        <div className='row mt-5'>
            <div className='col-md-4'>
                <img 
                    src={ heroImages(`./${id}.jpg`) } 
                    alt={ superhero } 
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                />
            </div>

            <div className='col-md-8 animate__animated animate__fadeIn'>
                <h3>{ superhero }</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><b>Alter ego:</b>{ alter_ego }</li>
                    <li className='list-group-item'><b>Publisher:</b>{ publisher }</li>
                    <li className='list-group-item'><b>First Apperance:</b>{ first_appearance }</li>
                </ul>

                <h5 className='mt-3'>Characters</h5>
                <p>{ characters }</p>

                <button 
                    className='btn btn-outline-info'
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
