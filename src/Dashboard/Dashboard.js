import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Playlist } from '../Playlist/Playlist';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-playlist')
  }

  useEffect(() => {
    // Actualiza la URL con tu punto de acceso a la API
    axios.get('/playlist/playlists') 
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las listas de reproducción:', error);
      });
  }, []);
  
  return (
    <div className="dashboard-container">
      <h1>Mis Listas de Reproducción</h1>
      <button onClick={handleClick}>Nueva Playlist</button>
      <div className="playlists">
        {playlists.map(playlist => (
          <div className="playlist-container" key={playlist.id}>
            <h2>{playlist.name}</h2>
            <div className="playlist">
              <Playlist playlist={playlist} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


