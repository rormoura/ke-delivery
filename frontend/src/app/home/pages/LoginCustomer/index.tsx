import styles from "./index.module.css"
import Food1 from "../../../../shared/assets/food1.png"

const LoginCustomer = () => {

  return (
    <section className={styles.container}>
      <img className={styles.imagem1} src={Food1} alt="Comida" />
      <div className={styles.content}> 
        <h1 className={styles.title}>O que você quer, onde você quer, quando você quer!</h1>
        <input className={styles.input} type="text" placeholder="Digite seu e-mail" />
        <input className={styles.input} type="password" placeholder="Digite sua senha" />
        <button className={styles.button}>
          <p className={styles.textButton}>Entrar</p>
        </button>
      </div>
    </section>
  );
};

export default LoginCustomer;
