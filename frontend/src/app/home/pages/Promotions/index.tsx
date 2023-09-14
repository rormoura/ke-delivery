import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
 
type Promotion = {id: string, name: string, discount: string};

const Promotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState<any>({id:'',name:'',discount:''});
  const [updateData, setUpdateData] = useState({ id:'',name:'',discount:''});

  useEffect(() => {
    axios.get(`http://localhost:5001/api/promotions`)
      .then((response) => {
        setPromotions(response.data.data);
      })
      .catch((error) => {
        alert(`Não foi possível carregar as promoções disponíveis: `+error);
      });
  }, []);

  const handleAddPromotion = () => {
    setShowModal(true);
    setFormData({});
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = () => {
    if(formData.id == undefined  || formData.id === ""){
      alert('Não foi possível adicionar a promoção, pois está incompleta')
    }
    else if(formData.name == undefined || formData.name === ""){
      alert('Não foi possível adicionar a promoção, pois está incompleta')
    }
    else if(formData.discount == undefined || formData.discount === ""){
      alert('Não foi possível adicionar a promoção, pois está incompleta')
    }
    else{
    axios.post(`http://localhost:5001/api/promotions/`, formData)
      .then((response) => {
        setPromotions([...promotions, response.data.data]);
        closeModal();
        alert(`Promoção ${formData.name} adicionada com sucesso.`);
      })
      .catch((error) => {
        alert(`Não foi possível adicionar a promoção ${formData.name}: `+error.response.data.msg);
      });
    }
  };

  const handleUpdateSubmit = () => {
    if(updateData.name == ""){
      alert('Não foi possível atualizar a promoção, pois está incompleta')
    }
    else if(updateData.discount === ""){
      alert('Não foi possível atualizar a promoção, pois está incompleta')
    }
    else{
      axios.put(`http://localhost:5001/api/promotions/${formData.name}`, updateData)
        .then((response) => {
            alert(`A promoção ${formData.name} foi atualizada corretamente.`);
            setPromotions((prevState) => {
              const updatedMethods = prevState.filter((method: any) => method.name !== formData.name);
              return [...updatedMethods, response.data.data];
            });
            setFormData({});
            setShowUpdateModal(false);
        })
        .catch((error) => {
          alert(`Não foi possível atualizar a promoção ${formData.name}: `+error.response.data.msg);
        });
      }
  };

  const handleUpdatePromotion = (name: string) => {
    setFormData({name});
    axios.get(`http://localhost:5001/api/promotions/${name}`)
      .then((response) => {
        setShowUpdateModal(true);
        setUpdateData(response.data.data);
      })
  };

  const handleDeletePromotion = (name: string) => {
    axios.delete(`http://localhost:5001/api/promotions/${name}`)
      .then(() => {
        alert(`A promoção ${name} foi removida corretamente.`);
        setPromotions(promotions.filter((method: any) => method.name !== name));
      })
      .catch((error) => {
        alert(`Não foi possível remover a promoção ${name}: `+error.response.data.msg);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Promoções</h1>

      <div className={styles.promotions}>
        <h2>Promoções disponíveis</h2>
        <ul>
          {promotions.map((method: Promotion) => (
            <li key={method.name} data-cy="promocoesDisponiveis">
              {method.name} (Desconto: {method.discount}) (Id: {method.id})
              <button data-cy={"atualizar"+method.name} onClick={() => handleUpdatePromotion(method.name)}>Atualizar</button>
              <button data-cy={"remover"+method.name} onClick={() => handleDeletePromotion(method.name)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.addPromotion}>
        <h2>Adicionar promoção</h2>
        <button data-cy="adicionarPromocao" onClick={() => handleAddPromotion()}>Adicionar promoção</button>
      </div>

      {showModal && (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Adicionar promoção:</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="id">ID do restaurante:</label>
              <input
                required
                data-cy="idModal"
                type="text"
                id="id"
                name="id"
                value={formData.id || ''}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
              <label htmlFor="name">Nome:</label>
              <input
                required
                data-cy="nomeModal"
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="discount">Desconto:</label>
              <input
                required
                data-cy="discountModal"
                type="text"
                id="discount"
                name="discount"
                value={formData.discount || ''}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              />
            </div>
            <button data-cy="adicionarModal" type="button" onClick={handleSubmit}>Adicionar</button>
            <button data-cy="cancelarModal" type="button" onClick={closeModal}>Cancelar</button>
          </form>
        </div>
        </div>
      )}

      {showUpdateModal && (
              <div className={styles.modal}>
              <div className={styles.modalContent}>
              <h2>Atualizar promoção</h2>
                <form>
                <div className={styles.formGroup}>
                <label htmlFor="id">ID do restaurante:</label>
                  <input
                    data-cy="idUpdateModal"
                    type="text"
                    name="id"
                    value={updateData.id}
                    onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
                    disabled
                  />
                <label htmlFor="name">Nome:</label>
                  <input
                    required
                    data-cy="nomeUpdateModal"
                    type="text"
                    name="name"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                  />
                <label htmlFor="discount">Desconto:</label>
                  <input
                    required
                    data-cy="discountUpdateModal"
                    type="text"
                    name="discount"
                    value={updateData.discount}
                    onChange={(e) => setUpdateData({ ...updateData, discount: e.target.value })}
                  />
                  <button data-cy="atualizarUpdateModal" type="button" onClick={handleUpdateSubmit}>Atualizar</button>
                  <button data-cy="cancelarUpdateModal" type="button" onClick={() => {setFormData({}); setShowUpdateModal(false); setUpdateData({ id:'',name:'',discount:''});}}>Cancelar</button>
                  </div>
                </form>
              </div>
              </div>
            )}

    </div>
  );
};

export default Promotions;
