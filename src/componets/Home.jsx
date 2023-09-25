import { useState, useEffect } from 'react';
import './homeStyle.css';
import MovieList from './MovieList';

export const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=f54cb438a37076a7b6dbcab3ee848999'
    )
      .then((response) => response.json())
      .then((data) => {
        // Recorremos los resultados y obtenemos los detalles de cada película
        const moviePromises = data.results.map((movie) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=f54cb438a37076a7b6dbcab3ee848999&language=en-US`
          ).then((response) => response.json())
        );

        // Esperamos a que todas las solicitudes de detalles se completen
        Promise.all(moviePromises).then((moviesWithDetails) => {
          setData(moviesWithDetails);
        });
      });
  }, []);

  // TODO: crear funciino que se ejecute con el onchange del input buscar

  // TODO: dentor de la funcion obtienes el texto que el usuario escribio, y con ese valor llamar al endpoint de buscar pelicula
  // TODO: const url = `https://api.themoviedb.org/3/search/movie?query=${palabraQueElUsuarioEscribio}&include_adult=false&language=en-US&page=1&api_key=f54cb438a37076a7b6dbcab3ee848999`;

  return (
    <>
      <header className="navigation">
        <h1>SpectrumCine</h1>
        {/* TODO: Agregar el onchange */}
        <input type="text" placeholder="Buscar..." />
      </header>
      <main>
        {/* TODO: Agregar otro listado de peliculas buscadas */}
        {/* TODO: {peliculasEncontradas && peliculasEncontradas.lenght > 0 && <>
          <h2>Peliculas encontradas</h2>
          <MovieList data={peliculasEncontradas} />
        </>} */}
        <h2>Últimos estrenos</h2>
        <MovieList data={data} />
      </main>
      <footer></footer>
    </>
  );
};
