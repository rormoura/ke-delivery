import React, { useContext } from 'react'
import styles from "./carrinhoItem.module.css";
import { BsCartDash } from 'react-icons/bs'
import formatCurrency from "../../../../utils/formatCurrency.js";
import propTypes from "prop-types";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function CarrinhoItem({ data }) {

    const { id, thumbnail, title, price } = data;
    const { cartItems, setCartItems} = useContext(PedidosContext);

    const handleRemoveItem = () => {
        const updatedItems = cartItems.filter((item) => item.id != id);
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
                <h3 className={styles.cartItemPrice}>{formatCurrency(price, 'BRL')}</h3>

                <button
                    type="button"
                    className={styles.buttonRemoveItem}
                    onClick={handleRemoveItem}
                >
                    <BsCartDash/>
                </button>
            </div>
        </section>
    )
}

export default CarrinhoItem;

CarrinhoItem.propTypes = {
    data: propTypes.object
};