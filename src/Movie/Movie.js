import React, { useState} from 'react';
import { MovieDetail } from '../MovieDetail/MovieDetail';
import './movie.css'
import '../MovieDetail/moviedetail.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const { title,posterPath } = movie;
  const image = 'https://image.tmdb.org/t/p/w185/' + posterPath;
  const handleClick =  (id) => {
    navigate(`/movie/${id}`);
    // setShowDetails(!showDetails);
    // try {
    //   const {data} = await axios.get(`/movies/${movie.id}`, {
    //     headers: {
    //       Accept: 'application/json',
    //     },
    //   });
    //   setMovieDetails(data);
    // } catch (err) {
    //   setErr(err.message);
    // } finally {
    // }
  }
  // console.log(movieDetails)
  return (
    <div className="movie-detail-container movie-item">
      <h3>{title}</h3>
      <div className="movie-detail-content">
        <img src={image} alt={title} />
        <div className="description-container">
        <button className="button_de"  onClick={()=>handleClick(movie.id)}>Detalles</button>
         <div>
        </div>
        </div>
      </div> 
    </div>
  );
}