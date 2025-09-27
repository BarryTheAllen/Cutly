import { Link, useNavigate } from 'react-router'
import styles from './Home.module.css'
import Button from '../../UI/Button/Button'
import { useAuth } from '../../contexts/AuthContexts';
import { useEffect } from 'react';
const Home = () => {
   const { loginUser, user } = useAuth();
  const navigate = useNavigate();

  const redirectToProfile = () => {
     if(user) {
      navigate("/Profile")
    } else if(!user) {
      navigate("/Home")
    }
  }

  useEffect(() => {
    redirectToProfile()
  }, [user])
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
        <Link to={"/Registration"}><Button text={"Регистрация"}/></Link>
    </div>
  )
}

export default Home