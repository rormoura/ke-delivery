import styles from "./index.module.css";
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg";

const TypesRegisters = () => {
  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Quase lá!</h1>
        <h3>Nos diga qual tipo de login deseja realizar.</h3>
      </div>
      <div className={styles.cards}>
        <a>
          <button className={styles.button}>Pessoa Consumidora</button>
        </a>
        <a>
          <button className={styles.button}>Pessoa Entregadora</button>
        </a>
        <a href="/loginRestaurant">
          <button className={styles.button}>Restaurante</button>
        </a>
      </div>
      {/* <Footer /> */}
    </section>
  )
}

export default TypesRegisters;