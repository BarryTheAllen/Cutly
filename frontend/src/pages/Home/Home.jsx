import { Link } from 'react-router'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.home}>
        <span className={styles.preTitle}>URL Сокращатель</span>
        <h1 className={styles.title}>
          Получите полный контроль
          над короткими ссылками
        </h1>
        <p className={styles.subTitle}>
          Платформа для сокращения ссылок
          с полным функционалом:
          управление ссылками,
          аналитика переходов,
          создание QR-кодов и страницы «Ссылка в био».
          Получайте короткие ссылки, брендируйте их,
          управляйте,
          отслеживайте и делитесь ими без усилий.
        </p>
        <Link to={"/Registration"}>Регистрация</Link>
    </div>
  )
}

export default Home