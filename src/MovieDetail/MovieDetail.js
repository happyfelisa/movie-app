import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AddToPlaylistButton } from '../Button/Addtoplaylistbutton/AddToPlayListButton';
import './moviedetail.css';

export const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/movies/${id}`);
        setMovieDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-detail-container">
      {error ? (
        <p>Error al cargar los detalles de la película.</p>
      ) : movieDetails ? (
        <div className="movie-detail-content">
          <h3 className="movie-title">{movieDetails.title}</h3>
          <div className="movie-info">
            <div className="movie-image">
              <img src={`https://image.tmdb.org/t/p/w185/${movieDetails.posterPath}`} alt={movieDetails.title} />
            </div>
            <div className="movie-description">
              <p>{movieDetails.overview}</p>
              <h4>Elenco:</h4>
              <ul>
                {movieDetails.actors.map((actor, index) => (
                  <li key={index}>{actor.name}</li>
                ))}
              </ul>
              <AddToPlaylistButton  movie={movieDetails} />
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando detalles de la película...</p>
      )}
    </div>
  );  
}