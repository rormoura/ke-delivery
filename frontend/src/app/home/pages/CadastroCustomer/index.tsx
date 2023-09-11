import styles from "./index.module.css";
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg";

const CadastroCustomer = () => {
  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre-se!</h1>
      </div>
      <div className={styles.background}>
        <h2 className={styles.subtitle}>Seus Dados</h2>
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
            <label>CPF</label>
            <input 
              name="cpf"
              placeholder="Digite seu CPF"
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
            <label>Endereço</label>
            <input 
              name="address"
              placeholder="Digite seu endereço"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Senha</label>
            <input 
              name="password"
              placeholder="Crie uma senha"
              className={styles.input}
            />
          </div>
        </div>
        <button className={styles.button}>Cadastrar</button>
      </div>
    </section>
  )
}

export default CadastroCustomer;