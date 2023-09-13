import styles from "./index.module.css";
import FoodImage from "../../../../../shared/assets/pasta.jpg";

const Card = () => {
  return(
  <section >
    {/* fazer map como todos os itens daquele restaurante */}
    <div className={styles.card}>
      <img src={FoodImage} className={styles.img}/>
      <h3 className={styles.title}>Nome do item</h3>
      <p className={styles.value}>R$ </p>
      {/* integrar para ir para formulário de edição */}
      <a>
        <button className={styles.editButton}>Editar item</button>
      </a>
    </div>
  </section>
  )
}

export default Card;