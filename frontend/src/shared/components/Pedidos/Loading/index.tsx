import { AiOutlineReload } from 'react-icons/ai';

import styles from "./Loading.module.css";

function Loading() {
    return <AiOutlineReload className={styles.loading} />;
}

export default Loading;