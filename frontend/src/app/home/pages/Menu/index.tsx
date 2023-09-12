import styles from "./index.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
// register Swiper custom elements
register();


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
    // Substitua a URL abaixo pela URL da sua API
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

  // Renderize os dados recebidos na sua interface
  return (
    <div className={styles['menu-page']}>

      {restaurantData.data.map((place: any) => ( 
        <div>
          <div className="flex items-center justify-center mt-10">
            <img src="src\shared\assets\images\Subtract.png" alt="Imagem" className="mr-4" />
            <h1 className="text-xl font-bold">{place.restaurantName}</h1>
          </div>
          <div className="mt-3">
            <button className={styles['discreet-button']}>Adicionar novo item</button>
          </div>

          <div className={styles['menu-items']}>
            {data.data.map((item: any) => (
              <div> 
                { item.restaurantId == place.id && 
                  <div className={styles['menu-item']} key={item.id}>
                    <img src={`src/shared/assets/images/${item.name}.png`} alt={item.name} />
                    <p className={styles['menu-item-name']}>{item.name}</p>
                    <p className={styles['menu-item-price']}>{item.price}</p>
                    <Link to={`/cart/${item.id}`}>
                      <button className={styles['add-to-cart-button']}>Adicionar ao carrinho</button>
                    </Link>
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
