<<<<<<< HEAD
import React, { useContext } from 'react';
import styles from "./ProductCard.module.css";
=======
import React, {useContext} from "react";
import styles from "../../../../app/home/pages/Menu/index.module.css";
>>>>>>> 1cf9afc1020ce3dd0f3c209d915ddfd50eec3b56
import propTypes from "prop-types";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import formatCurrency from "../../../../utils/formatCurrency.js";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function ProductCard({ data }) {
<<<<<<< HEAD
    const { title, thumbnail, price } = data;
=======

<<<<<<< HEAD
    const { id, name, restaurantId, price } = data;
>>>>>>> 1cf9afc1020ce3dd0f3c209d915ddfd50eec3b56
=======
    const { id, name, restaurantId, price, image } = data;
>>>>>>> dae10c5f3d6c8b67c68913bbac827c9758c4be52
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
<<<<<<< HEAD
        <section className={styles.productCard}>
            <img
                src={thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
                alt="Product"
                className={styles.cardImage}
            />

            <div className={styles.cardInfos}>
                <h2 className={styles.cardPrice}>{formatCurrency(price, 'BRL')}</h2>
                <h2 className={styles.cardTitle}> {title}</h2>
            </div>

            <button
                type="button"
                className={styles.buttonAddCart}
                onClick={handleAddCart}
            >
                <MdOutlineAddShoppingCart />
            </button>
        </section>
=======
        <div className={styles['menu-item']} key={id}>
                <img src={image} alt={name} />
                <p className={styles['menu-item-name']}>{name}</p>
                <p className={styles['menu-item-price']}>{formatCurrency(price, 'BRL')}</p>
                <button
                    type="button"
                    className={styles['add-to-cart-button']}
                    onClick={handleAddCart}
                >
                    Adicionar ao carrinho <MdOutlineAddShoppingCart />
                </button>
        </div>
>>>>>>> 1cf9afc1020ce3dd0f3c209d915ddfd50eec3b56
    );
}

ProductCard.propTypes = {
    data: propTypes.shape({}),
};

export default ProductCard;
