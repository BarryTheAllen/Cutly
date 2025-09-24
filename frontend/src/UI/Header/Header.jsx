import Button from "../Button/Button"
import { useAuth } from '../../contexts/AuthContexts';
import styles from "./Header.module.css"
import { Link } from "react-router"

const Header = () => {
  const { user, token, isLoading, logout } = useAuth();
  return (
    <header className={styles.header}>
        <Link to={"/Home"}>
        <h1 className={styles.logo}>Cuttly</h1>
        </Link>
        {token ? (<div>
                  <p className={styles.useremail}>{user?.email}</p>
                  <Button fn={logout} width={100} height={30} text={isLoading ? "Загрузка..." : "Выйти"}/>
                </div>)
        :
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <Link to={"/Login"} >
                   <Button text={"Войти"} width={110} height={35}/>
                </Link>
                <Link to={"/Registration"}>
                    <Button text={"Регистрация"} width={140} height={35}/>
                </Link>
            </ul>
        </nav>}
    </header>
  )
}

export default Header