import React, { useContext } from 'react';
import styles from "./carrinhoItem.module.css";
import { BsCartDash, BsCartX, BsCartPlus } from 'react-icons/bs'
import formatCurrency from "../../../../utils/formatCurrency.js";
import propTypes from "prop-types";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function CarrinhoItem({ data }) {
    const { id, thumbnail, title, price, quantity } = data;
    const { cartItems, setCartItems } = useContext(PedidosContext);

    const handleRemoveItem = () => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    }

    return (
        <section className={styles.cartItem}>
            <img src={thumbnail}
                alt="Imagem do produto"
                className={styles.cartItemImage}
            />
            <div className={styles.cartItemContent}>
                <h3 className={styles.cartItemTitle}>{title}</h3>
                <div className={styles.cartItemQuantity}>{quantity} Und. x {formatCurrency(price, 'BRL')}</div>
                <h3 className={styles.cartItemPrice}>
                    {formatCurrency(price * quantity, 'BRL')}
                </h3>
                

                <button
                    type="button"
                    className={styles.buttonRemoveItem}
                    onClick={handleRemoveItem}
                >
                    <BsCartX />
                </button>

                <button
                    type="button"
                    className={styles.buttonDecreaseItem}
                    onClick={handleRemoveItem}
                >
                    <BsCartDash />
                </button>

                <button
                    type="button"
                    className={styles.buttonDecreaseItem}
                    onClick={handleRemoveItem}
                >
                    <BsCartDash />
                </button>
                <button
                    type="button"
                    className={styles.buttonIncreaseItem}
                    onClick={handleRemoveItem}
                >
                    <BsCartPlus />
                </button>

            </div>
        </section>
    );
}

CarrinhoItem.propTypes = {
    data: propTypes.object
};

export default CarrinhoItem;
