import styles from "./index.module.css";
import Button from "../Button";

interface CardProps {
  image: string;
  productName: string;
  value: string;
}

const Card = ({image, productName, value}: CardProps) => {
  return(
  <section >
    {/* fazer map como todos os itens daquele restaurante */}
    <div className={styles.card}>
      <img src={image} className={styles.img}/>
      <h3 className={styles.title}>{productName}</h3>
      <p className={styles.value}>{value}</p>
      {/* integrar para ir para formulário de edição */}
      <a>
        <Button 
          title="Editar item"
        />
      </a>
    </div>
  </section>
  )
}

export default Card;