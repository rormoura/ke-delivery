import styles from "./index.module.css"
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg"

const Navbar = () => {
  return(
    <section className={styles.container}>
      <div className={styles.logo}>
        <img src={LogoTemporaria} alt="Logo"/>
        <h1 className={styles.title}>Ké Delivery</h1>
      </div>
      <div>
        <button className={styles.buttonLogin}>Entrar</button>
      </div>
    </section>
  )
}

export default Navbar;