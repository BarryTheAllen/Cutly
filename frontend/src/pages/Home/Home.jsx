import { Link } from 'react-router'
import styles from './Home.module.css'
import { useEffect, useState } from 'react'
import { useLoginedUser } from '../../contexts/LoginedUserContexts';
import Button from '../../UI/Button/Button';
const Home = () => {
  const [link, setLink] = useState("");
  const {setUserLink, createShortLink, shortLink, getShortLink} = useLoginedUser();

  const urlHandler = (value) => {
    setLink(JSON.stringify(value))
  }

  useEffect(() => {
    return () => {
  setUserLink(link)
    }
  }, [link, setUserLink])

    const handleSubmit = async (e) => {
    e.preventDefault();
    await createShortLink();
  }
  

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
        <form onSubmit={handleSubmit}>
          <input type="text" value={link} onChange={e => urlHandler(e.target.value)} className={styles.createShortLink}/>
          <button type='submit' style={{margin: "60px"}}>asdassdasdasdas</button>
        </form>
        <button style={{margin: "60px"}} onClick={getShortLink}>huy</button>
        <p color='black'>{shortLink}</p>
    </div>
  )
}

export default Home