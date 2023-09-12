import { ButtonHTMLAttributes } from "react";
import styles from "./cartButton.module.css";
import { CgShoppingCart } from 'react-icons/cg'

type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement>;

const CartButton = (props: ButtonPros) => {
  return (
    <button {...props} className={styles.button}>
          {props.children}
          <CgShoppingCart />
          <span className={styles.cartStatus}>7</span>
    </button>
  );
};

export default CartButton;
