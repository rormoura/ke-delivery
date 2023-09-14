import React, { useContext, useEffect, useState } from 'react';
import styles from './carrinho.module.css';
import CarrinhoItem from '../CarrinhoItem';
import PedidosContext from '../../../../app/home/context/PedidosContext/PedidosContext.js';
import formatCurrency from '../../../../utils/formatCurrency.js';

function Carrinho() {
    const { cartItems, isCartVisible, qtdItems, setQtdItems } = useContext(PedidosContext);

    // Calculate the total value of items in the cart
    const totalValue = cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0);

    // Update the qtdItems state in the context whenever the total quantity changes
    useEffect(() => {
        setQtdItems(cartItems.reduce((acc, item) => item.quantity + acc, 0));
    }, [cartItems, setQtdItems]);

    // Conditionally apply the class based on isCartVisible
    const cartClass = isCartVisible ? styles.cartActive : styles.cart;

    const handleCheckout = () => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    }

    return (
        <section className={cartClass}>
            <div className={styles.cartItens}>
                {cartItems.map((cartItem) => (
                    <CarrinhoItem key={cartItem.id} data={cartItem} />
                ))}
            </div>

            <div className={styles.cartResume}>
                {formatCurrency(totalValue, 'BRL')}
                <button
                    className={styles.cartCheckout}
                    type="button"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </section>
    );
}

export default Carrinho;
