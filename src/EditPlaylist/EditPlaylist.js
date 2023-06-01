import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editplaylist.css';

export const EditPlaylist = ({ match }) => {
  const [playlist, setPlaylist] = useState(null);
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [removalCandidate, setRemovalCandidate] = useState(null);

  useEffect(() => {
    axios.get(`https://tu-api.com/playlists/${match.params.id}`)
      .then(response => {
        setPlaylist(response.data);
        setName(response.data.name);
        setMovies(response.data.movies);

        axios.post('https://tu-api.com/movies', { ids: response.data.movies })
          .then(response => {
            const details = {};
            response.data.forEach(movie => {
              details[movie.id] = movie;
            });
            setMovieDetails(details);
          })
          .catch(error => {
            console.error('Hubo un error al obtener los detalles de las películas:', error);
          });
      })
      .catch(error => {
        console.error('Hubo un error al obtener la lista de reproducción:', error);
      });
  }, [match.params.id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRemoveMovie = (movieId) => {
    setRemovalCandidate(movieId);
  };

  const confirmRemoveMovie = () => {
    setMovies(movies.filter(id => id !== removalCandidate));
    setMovieDetails(prevDetails => {
      const newDetails = { ...prevDetails };
      delete newDetails[removalCandidate];
      return newDetails;
    });
    setRemovalCandidate(null);
  };

  const cancelRemoveMovie = () => {
    setRemovalCandidate(null);
  };

  const handleUpdatePlaylist = (event) => {
    event.preventDefault();

    axios.put(`https://tu-api.com/playlists/${match.params.id}`, {
      name: name,
      movies: movies
    })
      .then(response => {
        setPlaylist(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al actualizar la lista de reproducción:', error);
      });
  };

  if (!playlist) {
    return <p>Cargando lista de reproducción...</p>;
  }

  return (
    <div className="edit-playlist-container">
      <h2>Editar lista de reproducción</h2>
      <form onSubmit={handleUpdatePlaylist}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <h3>Películas en la lista:</h3>
        <ul>
          {movies.map(movieId => (
            <li key={movieId}>
              <button onClick={() => handleRemoveMovie(movieId)}>Eliminar de la lista</button>
              {removalCandidate === movieId && (
                <div>
                  <p>¿Estás seguro de que quieres eliminar esta película de la lista?</p>
                  <button onClick={confirmRemoveMovie}>Sí</button>
                  <button onClick={cancelRemoveMovie}>No</button>
                </div>
              )}
              <p>{movieId} - {movieDetails[movieId] ? movieDetails[movieId].title : 'Cargando...'}</p>
            </li>
          ))}
        </ul>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

