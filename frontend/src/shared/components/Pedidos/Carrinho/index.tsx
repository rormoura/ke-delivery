import React, { useContext } from 'react';
import styles from './carrinho.module.css';
import CarrinhoItem from '../CarrinhoItem';
import PedidosContext from '../../../../app/home/context/PedidosContext/PedidosContext.js';
import formatCurrency from '../../../../utils/formatCurrency.js';

function Carrinho() {
    const { cartItems, isCartVisible } = useContext(PedidosContext);

    const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

    // Conditionally apply the class based on isCartVisible
    const cartClass = isCartVisible ? styles.cartActive : styles.cart;

    return (
        <section className={cartClass}>
            <div className={styles.cartItens}>
                {cartItems.map((cartItem) => (
                    <CarrinhoItem key={cartItem.id} data={cartItem} />
                ))}
            </div>

            <div className={styles.cartResume}>{formatCurrency(totalPrice, 'BRL')}</div>
        </section>
    );
}

export default Carrinho;
