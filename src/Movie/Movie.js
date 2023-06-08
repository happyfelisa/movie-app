import React, { useState} from 'react';
import './movie.css'
import '../MovieDetail/moviedetail.css'
import axios from 'axios';
import { AddToPlaylistButton } from '../Button/Addtoplaylistbutton/AddToPlayListButton';

export const Movie = ({ movie }) => {
  const { title,posterPath } = movie;
  const image = 'https://image.tmdb.org/t/p/w185/' + posterPath;
  const [movieDetails, setMovieDetails] = useState({actors:[]});
  const [showDetails, setShowDetails] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setShowDetails(!showDetails);
    try {
      const {data} = await axios.get(`/movies/${movie.id}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      setMovieDetails(data);
    } catch (err) {
      setErr(err.message);
    } finally {
    }
  };

  console.log(movieDetails)
  return (
    <div className="movie-detail-container">
      <h3>{title}</h3>
      <div className="movie-detail-content">
        <img src={image} alt={title} />
        <div className="description-container">
        {err && <h2>{err}</h2>}
        <button onClick={handleClick}>Detalles</button>
        {showDetails ? <div>
        <p>{movieDetails.overview}</p>
        {movieDetails.actors.map(actor => {
        return (
          <div key={actor.id}>
            <h4>{actor.name}</h4>
          </div>
        );
        })}
        </div>
        : null}
        </div>
      </div>
      
    </div>
  );
}