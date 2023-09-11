import styles from "./index.module.css";
import Menu from "../../components/Restaurants/Menu";

const HomeRestaurant = () => {
  return(
    <section className={styles.container}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}>Olá, Nome do Restaurante</h1>
        <div className={styles.box}></div>
        <div className={styles.boxes}>
          <div className={styles.boxSmall}></div>
          <div className={styles.boxSmall}></div>
        </div>
      </div>
    </section>
  )
}

export default HomeRestaurant;