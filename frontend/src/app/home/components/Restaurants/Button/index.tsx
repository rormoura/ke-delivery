import styles from "./index.module.css"

interface ButtonProps{
  title: string;
}
const Button = ({title}: ButtonProps) => {
  return(
    <button className={styles.editButton}>{title}</button>
  )
}

export default Button;