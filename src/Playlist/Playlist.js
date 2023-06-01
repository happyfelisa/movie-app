import React from 'react';
import { MovieDetail } from '../MovieDetail/MovieDetail';
import './playlist.css';

export const Playlist = ({ playlist }) => {
  const { name, movies } = playlist; 

  return (
    <div>
      <h2>{name}</h2>
      {movies.map(movie => (
        <MovieDetail key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
