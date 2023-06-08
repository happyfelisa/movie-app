import React, { useState } from 'react';
import axios from 'axios';
import './newplaylist.css';
import { useNavigate } from 'react-router-dom';

export const NewPlaylist = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/playlist/create', {
      name: name
    })
      .then(response => {
        // Podrías redirigir al usuario a la página de la lista de reproducción recién creada aquí,
        // o actualizar la interfaz de alguna otra forma
        console.log('Lista de reproducción creada:', response.data);
        navigate('/dashboard')
      })
      .catch(error => {
        console.error('Hubo un error al crear la lista de reproducción:', error);
      });
  };

  return (
    <div className="new-playlist-container">
      <h2>Crear nueva lista de reproducción</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
