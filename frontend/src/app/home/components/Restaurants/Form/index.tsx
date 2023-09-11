import styles from "./index.module.css";
import LogoTemporaria from "../../../../../shared/assets/logoTemp.svg";

const Form = () => {
  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre aqui seu restaurante!</h1>
      </div>
      <div className={styles.background}>
        <h2 className={styles.subtitle}>Dados da pessoa responsável</h2>
        <div className={styles.formInputs}>
          <div className={styles.inputContainer}>
            <label>Nome Completo</label>
            <input 
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input 
              name="email"
              placeholder="Digite seu melhor email"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Telefone</label>
            <input 
              name="phone"
              placeholder="Digite seu numero"
              className={styles.input}
            />
          </div>
        </div>
        <h2 className={styles.subtitle}>Dados do restaurante</h2>
        <div className={styles.formInputs}>
          <div className={styles.inputContainer}>
            <label>Nome do restaurante</label>
            <input 
              name="restaurantName"
              placeholder="Digite nome do restaurante"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Telefone</label>
            <input 
              name="phoneRestaunrant"
              placeholder="Telefone do restaurante"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>CNPJ</label>
            <input 
              name="cnpj"
              placeholder="CNPJ da empresa"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Especialidade</label>
            <input 
              name="speciality"
              placeholder="Especialidade do restaurante"
              className={styles.input}
            />
          </div>
        </div>
        <button className={styles.button}>Cadastrar</button>
      </div>
    </section>
  )
}

export default Form;