import React, { useContext } from 'react';
import styles from "./ProductCard.module.css";
import propTypes from "prop-types";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import formatCurrency from "../../../../utils/formatCurrency.js";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function ProductCard({ data }) {
    const { id, name, image, price, restaurantId } = data;
    const { cartItems, setCartItems } = useContext(PedidosContext);

    const handleAddCart = () => {
        // Check if the item with the same ID already exists in the cart
        const existingItem = cartItems.find((item) => item.id === data.id);

        if (existingItem) {
            // If it exists, increase the quantity by 1
            const updatedItems = cartItems.map((item) =>
                item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedItems);
        } else {
            // If it doesn't exist, add it to the cart with a quantity of 1
            setCartItems([...cartItems, { ...data, quantity: 1 }]);
        }
    }

    return (
        <section
            data-cy="productCard"
            className={styles.productCard}>
            <img
                src={image}
                alt={name}
                className={styles.cardImage}
            />

            <div className={styles.cardInfos}>
                <h2 className={styles.cardPrice}>{formatCurrency(price, 'BRL')}</h2>
                <h2 className={styles.cardTitle}> {name}</h2>
            </div>

            <button
                type="button"
                data-cy="buttonAddCart"
                className={styles.buttonAddCart}
                onClick={handleAddCart}
            >
                <MdOutlineAddShoppingCart />
            </button>
        </section>
    );
}

ProductCard.propTypes = {
    data: propTypes.shape({}),
};

export default ProductCard;

