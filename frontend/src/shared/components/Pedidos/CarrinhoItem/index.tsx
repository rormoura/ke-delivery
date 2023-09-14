import React, { useContext } from 'react';
import styles from "./carrinhoItem.module.css";
import { BsCartDash, BsCartX, BsCartPlus } from 'react-icons/bs'
import formatCurrency from "../../../../utils/formatCurrency.js";
import propTypes from "prop-types";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function CarrinhoItem({ data }) {
    const { id, image, name, price, quantity, restaurantId } = data;
    const { cartItems, setCartItems } = useContext(PedidosContext);

    const handleRemoveItem = () => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    }

    const handleDecreaseItem = () => {
        const updatedItems = [...cartItems];
        const itemIndex = updatedItems.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
            if (updatedItems[itemIndex].quantity > 1) {
                updatedItems[itemIndex].quantity -= 1;
                setCartItems(updatedItems);
            } else {
                // If the quantity is 1, remove the item from the cart
                updatedItems.splice(itemIndex, 1);
                setCartItems(updatedItems);
            }
        }
    }

    const handleIncreaseItem = () => {
        const updatedItems = [...cartItems];
        const itemIndex = updatedItems.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
            updatedItems[itemIndex].quantity += 1;
            setCartItems(updatedItems);
        }
    }

    return (
        <section className={styles.cartItem}>
            <img src={image}
                alt="Imagem do produto"
                className={styles.cartItemImage}
            />
            <div className={styles.cartItemContent}>
                <h3 className={styles.cartItemTitle}>{name}</h3>
                <div className={styles.cartItemQuantity}>
                    {quantity} Und. x {formatCurrency(price, 'BRL')}
                </div>
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
                    onClick={handleDecreaseItem}
                >
                    <BsCartDash />
                </button>

                <button
                    type="button"
                    className={styles.buttonIncreaseItem}
                    onClick={handleIncreaseItem}
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
