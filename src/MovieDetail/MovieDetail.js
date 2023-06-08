import React from 'react';
import { AddToPlaylistButton } from '../Button/Addtoplaylistbutton/AddToPlayListButton';
import './moviedetail.css';





export const MovieDetail = ({ movieDetails }) => {

  console.log(movieDetails);
  const { overview, actors } = movieDetails;

  return (
      <div className="movie-detail-content">
          <p>{overview}</p>
          <h4>Elenco:</h4>
          <ul>
            {actors.map((actor, index) => (
              <li key={index}>{actor.name}</li>
            ))}
          </ul>

      <AddToPlaylistButton movie={movieDetails} />
    </div>
  );
}


