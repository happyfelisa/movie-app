import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './editplaylist.css';

export const EditPlaylist = ({ match }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [removalCandidate, setRemovalCandidate] = useState(null);
  const [showMovies, setShowMovies] = useState(false);
  const [addCandidate, setAddCandidate] = useState(null);

  useEffect(() => {
    axios.get(`/playlist/${params.id}`)
      .then(response => {
        setPlaylist(response.data);
        setName(response.data.name);
        setMovies(response.data.movies);

        axios.get('/movies/all', { ids: response.data.movies })
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
  }, [params.id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMovieList = () => {
    setShowMovies(!showMovies);
  };

  const handleRemoveMovie = (movieId) => {
    setRemovalCandidate(movieId);
  };

  const handleAddMovie = (movieId) => {
    setAddCandidate(movieId);
  };

  const confirmAddMovie = () => {
    const movieAdded = Object.values(movieDetails).find(movie =>{
      return movie.id === addCandidate;
    });
    setMovies([ ...movies,movieAdded ]);
    setMovieDetails(prevDetails => {
      const newDetails = { ...prevDetails };
      delete newDetails[removalCandidate];
      return newDetails;
    });
    setAddCandidate(null);
  };

  const confirmRemoveMovie = () => {
    setMovies(movies.filter(movie=> movie.id !== removalCandidate));
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

  const cancelAddMovie = () => {
    setAddCandidate(null);
  };

  const handleUpdatePlaylist = (event) => {
    event.preventDefault();

    axios.put(`/playlist/${params.id}`, {
      name: name,
      movies:movies.map(movie => movie.id)
    })
      .then(response => {
        setPlaylist(response.data);
        navigate('/dashboard');
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
          {movies.map(movie => (
            <li key={movie.id}>
              <button type="button"  onClick={() => handleRemoveMovie(movie.id)}>Eliminar de la lista</button>
              {removalCandidate === movie.id && (
                <div>
                  <p>¿Estás seguro de que quieres eliminar esta película de la lista?</p>
                  <button type="button" onClick={confirmRemoveMovie}>Sí</button>
                  <button type="button"  onClick={cancelRemoveMovie}>No</button>
                </div>
              )}
              <p>{movie.id} - {movieDetails[movie.id] ? movieDetails[movie.id].title : 'Cargando...'}</p>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleMovieList}>Agregar Peliculas</button>
        {showMovies? <div>
          <ul>
            {Object.values(movieDetails).map(movie => (
              <li key={movie.id}>
               {/* <AddToPlaylistButton movie={movie} /> */}
               <button type="button" onClick={() => handleAddMovie(movie.id)}>add</button>
                {addCandidate === movie.id && (
                  <div>
                    <p>¿Estás seguro de que quieres agregar esta película a la lista?</p>
                    <button type="button" onClick={confirmAddMovie}>Sí</button>
                    <button type="button"  onClick={cancelAddMovie}>No</button>
                  </div>
                )}
                <p>{movie.id} - {movie.title}</p>           
              </li>
            ))}
          </ul>
        </div> : null}
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

