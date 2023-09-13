import styles from "./index.module.css";
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg";

const TypesRegisters = () => {
  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre-se aqui!</h1>
        <h3>Nos diga qual tipo de cadastro deseja realizar.</h3>
      </div>
      <div className={styles.cards}>
        <a>
          <button className={styles.button}>Pessoa Consumidora</button>
        </a>
        <a>
          <button className={styles.button}>Pessoa Entregadora</button>
        </a>
        <a href="/registerRestaurant">
          <button className={styles.button}>Restaurante</button>
        </a>
      </div>
      <div className={styles.register}>
          <p>Já tem conta? </p>
          <a href="/login">
            <h2 className={styles.link}>Realize seu login</h2>
          </a>
        </div>
    </section>
  )
}

export default TypesRegisters;