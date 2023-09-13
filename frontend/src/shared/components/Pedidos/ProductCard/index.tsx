import React, {useContext} from "react";
import styles from "../../../../app/home/pages/Menu/index.module.css";
import propTypes from "prop-types";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import formatCurrency from "../../../../utils/formatCurrency.js";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function ProductCard({ data }) {

    const { id, name, restaurantId, price } = data;
    const { cartItems, setCartItems } = useContext(PedidosContext);

    const handleAddCart = () => setCartItems([...cartItems, data]);

    const handleExcluir = async (event, id) => {
        const response = await fetch('http://localhost:5001/api/menu/'+id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
          window.open(`/NovoPedido`, '_self');
      }

    return (
        <div className={styles['menu-item']} key={id}>
                <img src={`src/shared/assets/images/${name}.png`} alt={name} />
                <p className={styles['menu-item-name']}>{name}</p>
                <p className={styles['menu-item-price']}>{formatCurrency(price, 'BRL')}</p>
                <button onClick={(event) => handleExcluir(event, id)} className={styles['delete-button']}>Excluir</button>
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
