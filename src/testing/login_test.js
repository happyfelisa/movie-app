import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Login } from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Esto se utiliza para simular la solicitud de axios

describe('Login Component Test', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Login />
      </Router>,
    );

    expect(getByLabelText(/Correo electrónico:/i)).toBeInTheDocument();
    expect(getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    expect(getByText(/Iniciar sesión/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Login />
      </Router>,
    );

    // Simulando una respuesta exitosa de axios
    axios.post.mockResolvedValueOnce({ status: 200 });

    // Llenar los campos del formulario
    fireEvent.change(getByLabelText(/Correo electrónico:/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(getByLabelText(/Contraseña:/i), {
      target: { value: 'password' },
    });

    // Enviar el formulario
    fireEvent.click(getByText(/Iniciar sesión/i));

    // Esperar a que axios.post sea llamado
    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    // Verificar que axios.post fue llamado con los valores correctos
    expect(axios.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@test.com',
      password: 'password',
    });
  });
});
module.exports = {
  // Otras opciones de configuración de Jest...

  testMatch: ["<rootDir>/testing/**/*_test.js"],
};


