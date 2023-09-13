import React, { useContext, useEffect } from 'react';
import styles from './carrinho.module.css';
import CarrinhoItem from '../CarrinhoItem';
import PedidosContext from '../../../../app/home/context/PedidosContext/PedidosContext.js';
import formatCurrency from '../../../../utils/formatCurrency.js';

function Carrinho() {
    const { cartItems, isCartVisible, setCartItems, setQtdItems } = useContext(PedidosContext);

    // Função para agrupar itens pelo ID
    const groupedCartItems = cartItems.reduce((groups, item) => {
        const existingGroup = groups.find((group) => group.id === item.id);

        if (existingGroup) {
            existingGroup.quantity += 1;
        } else {
            groups.push({ ...item, quantity: 1 });
        }

        return groups;
    }, []);

    // Calculate the total quantity of items in the cart
    const totalQuantity = groupedCartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Update the qtdItems state in the context whenever the total quantity changes
    useEffect(() => {
        setQtdItems(totalQuantity);
    }, [totalQuantity, setQtdItems]);

    // Conditionally apply the class based on isCartVisible
    const cartClass = isCartVisible ? styles.cartActive : styles.cart;

    const handleCheckout = () => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    }

    return (
        <section className={cartClass}>
            <div className={styles.cartItens}>
                {groupedCartItems.map((cartItem) => (
                    <CarrinhoItem key={cartItem.id} data={cartItem} />
                ))}
            </div>

            <div className={styles.cartResume}>
                {formatCurrency(
                    groupedCartItems.reduce((acc, item) => item.price * item.quantity + acc, 0),
                    'BRL'
                )}
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
