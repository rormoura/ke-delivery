import React from 'react'
import styles from "./carrinhoItem.module.css";
import { BsCartDash } from 'react-icons/bs'
function CarrinhoItem() {
    return (
        <section className={styles.cartItem}>
            <img src=""
                alt=""
                className={styles.cartItemImage}
            />
            <div className={styles.cartItemContent}>
                <h3 className={styles.cartItemTitle }>Título do Produto</h3>
                <h3 className={styles.cartItemTitle}>Preço do Produto</h3>

                <button
                    type="button"
                    className={styles.buttonRemoveItem}
                >
                    <BsCartDash/>
                </button>
            </div>
        </section>
    )
}

export default CarrinhoItem;