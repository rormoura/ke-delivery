import React, {useEffect, useContext, useState } from "react";
import styles from "../../../../app/home/pages/Menu/index.module.css";
import fetchProducts from "../../../../api/fetchProducts.js";
import ProductCard from "../ProductCard";
import Loading from "../Loading";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";
import { Link } from "react-router-dom";

const Produtos = () => {
    
    const { products, setProducts, loading, setLoading } = useContext(PedidosContext);
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
            setProducts(responseData);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erro:', error);
            setLoading(false);
          });
      }, []);

    const handleExcluir = async (event, id) => {
        const response = await fetch('http://localhost:5001/api/menu/'+id, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        window.open(`/NovoPedido`, '_self');
    }


    return (
        (loading && <Loading />) || (
            <div className={styles['menu-page']}>
                <div className={styles['box']}></div>
                {restaurantData.data.map((place: any) => ( 
                    <div key={place.id}>
                    <div className={styles['restaurant']}>
                        <img src="src\shared\assets\images\Subtract.png" alt="Imagem"/>
                        <h1>{place.restaurantName}</h1>
                    </div>
                        <section className={styles['menu-items']}>
                            {products.data.map((product) => 
                            <div> 
                                { product.restaurantId == place.id && 
                                <ProductCard key={product.id} data={product} />
                                }
                            </div>
                            )}
                        </section>
                </div> ))}
            </div>)
    );
};

export default Produtos;
