import  { useState, useEffect } from 'react';
import './homeStyle.css';
import MovieList from './MovieList';

export const Home = () => {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  let timer;

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

  // Función para buscar películas
  const searchMovies = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=f54cb438a37076a7b6dbcab3ee848999`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      });
  };

  // Manejar el cambio en el input de búsqueda
  const handleSearchInputChange = (event) => {
    const valor = event.target.value;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchTerm(valor);
       }, 300);
  };

  // TODO: Agregar el onchange al input de búsqueda
  // Aquí usamos la función de búsqueda cuando el input cambia
  useEffect(() => {
    searchMovies();
  }, [searchTerm]);

  return (
    <>
      <header className="navigation">
        <h1>SpectrumCine</h1>
        {/* TODO: Agregar el onchange y el valor del input */}
        <input
          type="text"
          placeholder="Buscar..."
          onChange={handleSearchInputChange}
        />
      </header>
      <main>
        {/* TODO: Agregar otro listado de películas buscadas */}
        {searchResults.length > 0 && (
          <>
            <h2>Películas encontradas</h2>
            <MovieList data={searchResults} />
          </>
        )}
        <h2>Últimos estrenos</h2>
        <MovieList data={data} />
      </main>
      <footer></footer>
    </>
  );
};
