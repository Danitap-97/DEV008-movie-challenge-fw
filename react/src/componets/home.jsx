import  { useState, useEffect } from 'react';
import './home.css'
export const Componentes = () => {
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
          )
            .then((response) => response.json())
        );

        // Esperamos a que todas las solicitudes de detalles se completen
        Promise.all(moviePromises).then((moviesWithDetails) => {
          setData(moviesWithDetails);
        });
      });
  }, []);

  return (
    <div className="App">
      <header>
      <h1>SpectrumCine</h1>
      <input type='text' placeholder='buscar'/>
      </header>
      <section>
      
        {data.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Fecha de lanzamiento: {movie.release_date}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            )}
          </div>
        ))}
    
      </section>
    </div>
  );
};


