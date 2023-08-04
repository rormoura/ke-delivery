/* eslint-disable linebreak-style */
import React from 'react';
import DeliveryList from '../../components/DeliveryList';
import useFetch from '../../components/useFetch';

const DeliveryHome = function () {
  const { error, isPending, data: dados } = useFetch('http://localhost:8000/entregador');
  return (
    <div className="home">
      { error && <div>{error}</div>}
      { isPending && <div>Loading...</div> }
      <DeliveryList title="Entregador" data={dados} />
    </div>
  );
};

export default DeliveryHome;
