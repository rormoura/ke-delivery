import styles from "./index.module.css";
import LogoTemporaria from "../../../../../shared/assets/logoTemp.svg";
import { useState } from "react";

const addItemMenu = () => {
  const resId = (typeof window !== 'undefined' && window.location.search.includes('id='))
    ? new URLSearchParams(window.location.search).get('id')
    : 'defaultId';

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    restaurantId: resId,
    price: 0.0, // Inicialize o campo price como um número
  });

  const handleInputChange = (event, name) => {
    let value = event.target.value;

    // Se o campo atual é 'price', converta o valor para um número
    if (name === 'price') {
      value = parseFloat(value);
    }

    setFormData({ 
      ...formData, 
      [name]: value,
    });
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch('http://localhost:5001/api/menu', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      window.history.back();
      alert("Item cadastrado com sucesso!!");
      // setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre aqui seu prato!</h1>
      </div>
      <div className={styles.background}>
        <h2 className={styles.subtitle}>Dados da pessoa responsável</h2>
        <form className={styles.formInputs} onSubmit={handleForm}>
          <div className={styles.inputContainer}>
            <label>Nome</label>
            <input 
              name="name"
              placeholder="Digite o nome do prato"
              className={styles.input}
              required
              value={formData.name}
              onChange={(event) => handleInputChange(event, 'name')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Restaurante</label>
            <input 
              name="restaurantId"
              placeholder="Digite o id do restaurante dono do prato"
              className={styles.input}
              required
              value={formData.restaurantId}
              onChange={(event) => handleInputChange(event, 'restaurantId')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Preço</label>
            <input 
              name="price"
              type="number" // Use o tipo "number" para o campo de preço
              step="0.01" // Especifica a precisão de duas casas decimais
              placeholder="Digite o preço do prato"
              className={styles.input}
              required
              value={formData.price}
              onChange={(event) => handleInputChange(event, 'price')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Imagem</label>
            <input 
              name="image"
              placeholder="Digite a url da imagem"
              className={styles.input}
              required
              value={formData.image}
              onChange={(event) => handleInputChange(event, 'image')}
            />
          </div>
          <button className={styles.button} type="submit">Cadastrar</button>
        </form>
      </div>
    </section>
  );
};

export default addItemMenu;
