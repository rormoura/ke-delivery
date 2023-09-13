import React, { useContext } from "react";
import styles from "./cartButton.module.css";
import { CgShoppingCart } from "react-icons/cg";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function CartButton() {
    const { qtdItems, isCartVisible, setCartVisible } = useContext(PedidosContext);
    console.log(qtdItems)
    return (
        <button
            type="button"
            className={styles.button}
            onClick={() => setCartVisible(!isCartVisible)}
        >
            <CgShoppingCart />
            {qtdItems > 0 && (
                <span className={styles.cartStatus}>
                    {qtdItems}
                </span>
            )}
        </button>
    );
}

export default CartButton;
