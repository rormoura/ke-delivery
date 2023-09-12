import styles from "./NovoPedido.module.css";
import Header from "../../../../shared/components/Pedidos/Header";
import Footer from "../../../../shared/components/Pedidos/Footer";
import Produtos from "../../../../shared/components/Pedidos/Produtos";



const NovoPedido = () => {
    return (
        <div className={styles.body}>
            <Header></Header>
            <Produtos/>
            <Footer></Footer>
        </div>
    );
};

export default NovoPedido;
