import styles from "./index.module.css"
import Food1 from "../../../../shared/assets/food1.png"

const LoginCustomer = () => {

  return (
    <section className={styles.container}>
      <img className={styles.imagem1} src={Food1} alt="Comida" />
      <div className={styles.content}> 
        <h1 className={styles.title}>Ke delivery</h1>
      </div>
    </section>
  );
};

export default LoginCustomer;
