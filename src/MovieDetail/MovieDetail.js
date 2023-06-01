import React from 'react';
import { AddToPlaylistButton } from '../Button/Addtoplaylistbutton/AddToPlayListButton';
import './moviedetail.css';

export const MovieDetail = ({ movie }) => {
  const { title, overview, posterPath, actors } = movie;
  const image = 'https://image.tmdb.org/t/p/w185/' + posterPath;
  return (
    <div className="movie-detail-container">
      <h3>{title}</h3>
      <div className="movie-detail-content">
        <img src={image} alt={title} />
        <div className="description-container">
          <p>{overview}</p>
          <h4>Elenco:</h4>
          <ul>
            {actors.map((actor, index) => (
              <li key={index}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <AddToPlaylistButton movie={movie} />
    </div>
  );
}


