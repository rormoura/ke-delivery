import styles from "./index.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Menu: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    <div >
      <div className="flex items-center justify-center mt-10">
        <img src="src\shared\assets\images\Subtract.png" alt="Imagem" className="mr-4" />
        <h1 className="text-xl font-bold">Cardápio do restaurante X</h1>
      </div>
      <Link className="flex items-center justify-center m-5" to={'/cart'}>
                  <button className="rounded-xl px-2 pb-1 text-sm">
                      Adicionar ao carrinho
                  </button>
      </Link>
      <div className="max-md:1300px overflow-auto">
        <ul className="flex">
          {data.data.map((item: any) => (
            <li key={item.id} >
              <div className={styles.menuItem}>
                <img className={styles.menuItemImg} src={`src/shared/assets/images/${item.name}.png`}></img>
                <p className={styles.menuItemName}>{item.name}</p>
                <p className={styles.menuItemPrice}>{item.price}</p>
                <Link className="bg-white" to={'/cart'}>
                  <button className="bg-purus-button rounded-xl px-2 pb-1 text-sm">
                      Adicionar ao carrinho
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
