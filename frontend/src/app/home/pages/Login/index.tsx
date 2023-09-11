import styles from "./index.module.css"

const Login = () => {
  return(
    <section className={styles.container}>
      <div className={styles.backgroundContainer}>
        <h1>Ké delivery</h1> 
        {/* colocar logo */}
      </div>
      <div className={styles.formsLogin}>
        <h1>Quem bom te ver novamente!</h1>
        <label>
          Email:
          <input 
            type="text" 
            name="email" 
            className={styles.textInput}
          />
        </label>
        <label>
          Senha:
          <input 
            type="text" 
            name="password"
            className={styles.textInput}
          />
        </label>
        <button className={styles.button}>Entrar</button>
        {/* <form>
        </form> */}
      </div>
    </section>
  );
};

export default Login;