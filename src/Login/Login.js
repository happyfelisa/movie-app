import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useLazyQuery, gql } from "@apollo/client";


const USER_QUERY = gql`
  query login($username: String!, $password: String!){
    login(loginInput: { username: $username, password: $password}){
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
    /*
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
    }*/
  };
  const [login,{data}] = useLazyQuery(USER_QUERY);

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={(e) =>{
        e.preventDefault();
        login({ variables: { 
          username: email,
          password: password,
        }})
        if (data) {
          navigate('/dashboard');
        }
      }}>
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
