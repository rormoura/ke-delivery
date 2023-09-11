import { AreaHTMLAttributes } from "react";
import styles from "./index.module.css";

type FooterPros = AreaHTMLAttributes<HTMLAreaElement>;

const Footer = (props: FooterPros) => {
  return (
    <footer {...props} className={styles.button}>
      {props.children}
    </footer>
  );
};

export default Footer;
