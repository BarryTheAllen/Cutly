import styles from "./Header.module.css"
import { Link } from "react-router"

const Header = () => {
  return (
    <header className={styles.header}>
        <Link to={"/Home"}>
        <h1 className={styles.logo}>Cuttly</h1>
        </Link>
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <Link to={"/Login"} >
                    Войти
                </Link>
                <Link to={"/Registration"}>
                    Регистрация
                </Link>
            </ul>
        </nav>
    </header>
  )
}

export default Header