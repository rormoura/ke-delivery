import React, { useContext } from "react";
import styles from "./cartButton.module.css";
import { CgShoppingCart } from "react-icons/cg";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function CartButton() {
    const { cartItems, isCartVisible, setCartVisible } = useContext(PedidosContext);

    return (
        <button
            type="button"
            className={styles.button}
            onClick={() => setCartVisible(!isCartVisible)}
        >
            <CgShoppingCart />
            {cartItems.length > 0 && (
                <span className={styles.cartStatus}>
                    {cartItems.reduce((acc, item) => item.quantity + acc, 0)}
                </span>
            )}
        </button>
    );
}

export default CartButton;
