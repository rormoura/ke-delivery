import styles from "../../Menu/newItem/index.module.css";
import LogoTemporaria from "../../../../../shared/assets/logoTemp.svg";
import { useState } from "react";

const addDeliveryman = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    numOrders: ''
  });

  const handleInputChange = (event, name) => {
    setFormData({ 
      ...formData, 
      [name]: event.target.value 
    });
  }
  const [showPopup, setShowPopup] = useState(false);

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch('http://localhost:5001/api/entregadores', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      window.open(`/entregadores`, '_self');
      alert("Entregador cadastrado com sucesso!!");
      // setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre aqui seu entregador!</h1>
      </div>
      <div className={styles.background}>
        <h2 className={styles.subtitle}>Dados da pessoa responsável</h2>
        <form className={styles.formInputs} onSubmit={handleForm}>
          <div className={styles.inputContainer}>
            <label>Nome</label>
            <input 
              name="name"
              placeholder="Digite o nome do entregador"
              className={styles.input}
              required
              value = {formData.name}
              onChange={(event) => handleInputChange(event, 'name')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>E-mail</label>
            <input 
              name="restaurantId"
              placeholder="Digite o email do entregador"
              className={styles.input}
              required
              value = {formData.email}
              onChange={(event) => handleInputChange(event, 'email')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Pedidos</label>
            <input 
              name="numOrders"
              placeholder="Digite o número de pedidos realizados pelo entregador"
              className={styles.input}
              required
              value = {formData.numOrders}
              onChange={(event) => handleInputChange(event, 'numOrders')}
            />
          </div>
        <button className={styles.button} type = "submit">Cadastrar</button>
        </form>
      </div>
    </section>
  )
}

export default addDeliveryman;