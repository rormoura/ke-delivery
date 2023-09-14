import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonPros) => {
  return (
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
};

export default Button;
