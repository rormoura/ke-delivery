import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../context/HomeContext";
import { TestFormSchema, TestFormType } from "../../forms/TestForm";
import Button from "../../../../shared/components/Pedidos/Button";
import { Link } from "react-router-dom";


const NovoPedido = () => {
    const { state, prevState, service,  } = useContext(HomeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormType>({
    resolver: zodResolver(TestFormSchema),
  });

  const onSubmit: SubmitHandler<TestFormType> = async (body) => {
    service.createTest(body);
    reset();
  };

  useEffect(() => {
    if (
      state.createTestRequestStatus !== prevState?.createTestRequestStatus &&
      state.createTestRequestStatus.isSuccess()
    ) {
      alert("Teste criado com sucesso!");
    }
  }, [state, prevState]);


    return (

        <section className={styles.container}>
            <h1>Meu Carrinho</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <input
                    data-cy="input-name"
                    {...register("name")}
                    placeholder="Observações"
                    className={styles.formInputContainer}
                />
                {errors.name && (
                    <span data-cy="input-name-error" className={styles.formError}>
                        {errors.name.message}
                    </span>
                )}
            </form>
            
            <Button type="submit" data-cy="create">
                Prosseguir para pagamentoão
            </Button>
            <Button data-cy="create" type="reset">
                Limpar carrinho
            </Button>

    </section>

  );
};

export default NovoPedido;
