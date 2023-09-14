import React, {useContext} from "react";
import styles from "../../../../app/home/pages/Menu/index.module.css";
import propTypes from "prop-types";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import formatCurrency from "../../../../utils/formatCurrency.js";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function ProductCard({ data }) {

    const { id, name, restaurantId, price, image } = data;
    const { cartItems, setCartItems } = useContext(PedidosContext);

    const handleAddCart = () => setCartItems([...cartItems, data]);

    return (
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
    );
}

export default ProductCard;

ProductCard.propTypes = {
    data: propTypes.shape({}),
};
