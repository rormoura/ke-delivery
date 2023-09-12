import styles from "./footer.module.css"
import Logo from "../../../../shared/assets/logoZe.jpg"

const Footer = () => {

  return (
    <section className={styles.container}>
        <div className={styles.content}> 
            <img src={Logo} alt="Logo" width="100px" />
            <h1 className={styles.title}>Ke delivery</h1>
        <div className={styles.conteudos}> 
            <h1 className={styles.conteudo}>Sobre nos</h1>
            <h1 className={styles.conteudo}>Ajuda e suporte</h1>
            <h1 className={styles.conteudo}>Delivery</h1>
            <h1 className={styles.conteudo}>Produtos</h1>
        </div>
        <h1 className={styles.contato}>Contato: 4002-8922</h1>
      </div>
    </section>
  );
};

export default Footer;
