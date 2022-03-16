import { heroes } from '../data/heroes';

export const getHeroesByName = ( name = '' ) => {
    if ( name === '' ) {  // Si no se ingreso ningun nombre
        return [];  // retorna un arreglo vacio
    }

    name = name.toLowerCase();  // para que no sea case sensitive
    return heroes.filter( hero => hero.superhero.toLowerCase().includes(name) );
}
