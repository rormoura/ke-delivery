import React from 'react'
import styles from "./carrinho.module.css";
import CarrinhoItem from '../CarrinhoItem';
function Carrinho() {
    return (
        <section className={styles.cart}>
            <div className={styles.cartItens}>
                <CarrinhoItem />
            </div>
            <div className={styles.cartResume}>Resumo do carrinho</div>
        </section>
    )
}

export default Carrinho