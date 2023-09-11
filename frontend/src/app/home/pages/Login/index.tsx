import styles from "./index.module.css"
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg";

const Login = () => {
  return(
    <section className={styles.container}>
      <div className={styles.backgroundContainer}>
        <h1>Ké delivery</h1> 
        {/* colocar logo */}
      </div>
      <div className={styles.formsLogin}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Que bom te ver novamente!</h1>
        <div className={styles.input}>
          <label>Email:</label>
          <input 
            type="text" 
            name="email" 
            placeholder="Digite aqui seu melhor email"
            className={styles.textInput}
          />
        </div>
        <div className={styles.input}>
          <label>Senha:</label>
          <input 
            type="text" 
            name="password"
            placeholder="Digite sua senha"
            className={styles.textInput}
          />
        </div>
        <button className={styles.button}>Entrar</button>
        <div className={styles.register}>
          <p>Ainda não tem conta?</p>
          <a href="/typeRegister">
            <h2 className={styles.link}>Cadastre-se</h2>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;