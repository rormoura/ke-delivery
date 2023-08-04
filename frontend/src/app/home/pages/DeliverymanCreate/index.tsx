import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryman = { name, email };

    fetch('http://localhost:8000/entregador/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deliveryman),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      navigate('/deliveryman');
    })
    .catch(error => {
      console.error('Error:', error);
      // Tratar o erro adequadamente, por exemplo, mostrando uma mensagem de erro na tela.
    });
  };

  return (
    <div className="create">
      <h2>Adicione um entregador</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add deliveryman</button>
      </form>
    </div>
  );
};

export default Create;

