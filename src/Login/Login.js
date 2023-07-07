import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useQuery, gql } from "@apollo/client";


const USER_QUERY = gql`
  query{
    userm(id: 1) {
      id
      username
    }
  }
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        setError('Error al iniciar sesión');
      }
    } catch (error) {
      setError('Usuario no válido');
    }
  };

  const {data} = useQuery(USER_QUERY);
  console.log(data.userm.username);

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};
