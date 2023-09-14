import styles from "./index.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import function to register Swiper custom elements
// register Swiper custom elements


const Menu: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurantData, setRestaurantData] = useState<any>(null); // Estado para os dados do restaurante

  useEffect(() => {
    const restaurantApiUrl = 'http://localhost:5001/api/restaurants'; 

    fetch(restaurantApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((responseData) => {
        setRestaurantData(responseData);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = 'http://localhost:5001/api/menu';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar os dados.</div>;
  }

  const handleExcluir = async (event, id) => {
    const response = await fetch('http://localhost:5001/api/menu/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      window.location.reload();
  }

  // Renderize os dados recebidos na sua interface
  return (
    <div className={styles['menu-page']}>
      {restaurantData.data.map((place: any) => ( 
        <div key={place.id}>
          <div className={styles['restaurant']}>
            <img src="src\shared\assets\images\Subtract.png" alt="Imagem"/>
            <h1>{place.restaurantName}</h1>
          </div>
          <div>
            <Link to={`/novoItem?id=${place.id}`}>
            <button className={styles['discreet-button']}>Adicionar novo item</button>
            </Link>
          </div>

          <div className={styles['menu-items']}>
            {data.data.map((item: any) => (
              <div> 
                { item.restaurantId == place.id && 
                  <div className={styles['menu-item']} key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <p className={styles['menu-item-name']}>{item.name}</p>
                    <p className={styles['menu-item-price']}>{item.price}</p>
                    <button onClick={(event) => handleExcluir(event, item.id)} className={styles['delete-button']}>Excluir</button>
                  </div>
                }
              </div>
            ))}
          </div>
        </div> ))}
      
      
    </div>
  );
};

export default Menu;