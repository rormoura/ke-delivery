import React, {useEffect, useContext } from "react";
import styles from "./Produtos.module.css";
import fetchProducts from "../../../../api/fetchProducts.js";
import ProductCard from "../ProductCard";
import Loading from "../Loading";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";


const Produtos = () => {
    
    const { products, setProducts, loading, setLoading } = useContext(PedidosContext);

    useEffect(() => {
        fetchProducts('leite').then((response) => {
            setProducts(response);
            setLoading(false);
        });
    }, []);

    

    return (
        (loading && <Loading />) || (
            <section className={styles.products}>
                {products.map((product) => <ProductCard key={product.id} data={product} />)}
            </section>)
    );
};

export default Produtos;
