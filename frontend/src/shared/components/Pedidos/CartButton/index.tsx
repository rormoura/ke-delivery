import React, { useContext } from "react";
import styles from "./cartButton.module.css";
import { CgShoppingCart } from "react-icons/cg";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function CartButton() {
    const { qtdItems, isCartVisible, setCartVisible } = useContext(PedidosContext);
    console.log(isCartVisible);
    return (
        <section>
            <p hidden data-cy="Visible">
                {isCartVisible.toString()}
            </p>
            <button
                type="button"
                className={styles.button}
                onClick={() => setCartVisible(!isCartVisible)}
                data-cy="cart-button" // Adicione o atributo data-testid aqui
            >
                <CgShoppingCart />
                {qtdItems > 0 && (
                    <span className={styles.cartStatus}>
                        {qtdItems}
                        <p hidden data-cy="qtdItems">
                            {qtdItems.toString()}
                        </p>
                    </span>
                )}
            </button>
        </section>
        
    );
}

export default CartButton;
