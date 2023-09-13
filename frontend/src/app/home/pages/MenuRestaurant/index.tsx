import styles from "./index.module.css";
import Card from "../../components/Restaurants/Cards";
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg"
import FoodImage from "../../../../shared/assets/pasta.jpg";

const MenuRestaurant = () => {
  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cardápio do restaurante</h1>
      </div>
      <div className={styles.cards}>
        <Card 
          image={FoodImage}
          productName="Nome do item"
          value="R$ 0,00"
        />
        <Card 
          image={FoodImage}
          productName="Nome do item"
          value="R$ 0,00"
        />
        <Card 
          image={FoodImage}
          productName="Nome do item"
          value="R$ 0,00"
        />
      </div>
    </section>
  )
}

export default MenuRestaurant;