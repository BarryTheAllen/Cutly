import Button from "../Button/Button"
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
                   <Button text={"Войти"} width={110} height={35}/>
                </Link>
                <Link to={"/Registration"}>
                    <Button text={"Регистрация"} width={140} height={35}/>
                </Link>
            </ul>
        </nav>
    </header>
  )
}

export default Header