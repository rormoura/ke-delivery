import styles from "../Menu/index.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import function to register Swiper custom elements
// register Swiper custom elements


const Deliverymans: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:5001/api/entregadores';

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
    const response = await fetch('http://localhost:5001/api/entregadores/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      window.open(`/entregadores`, '_self');
  }

  // Renderize os dados recebidos na sua interface
  return (
    <div className={styles['menu-page']}>
      <div className={styles['box']}></div>
        <div className={styles['restaurant']}>
            <img src="src\shared\assets\images\Subtract.png" alt="Imagem"/>
            <h1>Entregadores</h1>
        </div>
        <div>
            <Link to={"/novoEntregador"}>
            <button className={styles['discreet-button']}>Adicionar novo entregador</button>
            </Link>
          </div>
        <div className={styles['menu-items']}>
        {data.data.map((item: any) => (
            <div> 
            <div className={styles['menu-item']} key={item.id}>
            <p className={styles['menu-item-name']}>{item.name}</p>
            <p className={styles['menu-item-price']}>Email: {item.email}</p>
            <p className={styles['menu-item-price']}>Pedidos: {item.numOrders}</p>
            <button onClick={(event) => handleExcluir(event, item.id)} className={styles['add-to-cart-button']}>Excluir</button>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Deliverymans;