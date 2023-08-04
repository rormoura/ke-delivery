import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryList = function (props) {
  const { data } = props;
  const { title } = props;
  //data.map((element) => (console.log(element.id, element.name, element.email)));
  return (
    <div className="delivery-list">
        <h1>{title}</h1>
        {data.map((element) => (
        <div className="element-preview" key={element.id}>
        <Link to={`/details/${element.id}`}>
        <h2>{element.name }</h2>
        <p>{element.email}</p>
        </Link>
        </div>
        ))}
    </div>
  );
  
};

export default DeliveryList;