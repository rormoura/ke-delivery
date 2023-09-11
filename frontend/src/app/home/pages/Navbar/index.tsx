import styles from "./index.module.css"
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg"

const Navbar = () => {
  return(
    <section className={styles.container}>
      <div className={styles.logo}>
        <img src={LogoTemporaria} alt="Logo" className={styles.icon}/>
        <h1 className={styles.title}>Ké Delivery</h1>
      </div>
      <a href="/login">
        <button className={styles.buttonLogin}>Entrar</button>
      </a>
    </section>
  )
}

export default Navbar;