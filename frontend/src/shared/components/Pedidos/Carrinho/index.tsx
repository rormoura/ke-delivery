import React, { useContext } from 'react'
import styles from "./carrinho.module.css";
import CarrinhoItem from '../CarrinhoItem';
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";
function Carrinho() {

    const {cartItems} = useContext(PedidosContext)

    return (
        <section className={styles.cart}>
            <div className={styles.cartItens}>
                {cartItems.map((cartItem) => <CarrinhoItem key={cartItem.id} data={cartItem}/>)}
                
            </div>
            <div className={styles.cartResume}>Resumo do carrinho</div>
        </section>
    )
}

export default Carrinho