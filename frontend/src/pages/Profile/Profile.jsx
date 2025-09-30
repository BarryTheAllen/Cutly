import React, { useEffect, useState } from 'react'
import { useLoginedUser } from '../../contexts/LoginedUserContexts';
import styles from "./Profile.module.css"
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContexts';

const Profile = () => {
    const { userLink,setUserLink, createShortLink, shortLink, getShortLink, deleteLink, getClicks, clicks } = useLoginedUser();
    const [active, setActive] = useState(false);
  const API_BASE_URL = 'http://localhost:8000';

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

      const handleSubmit = async (e) => {
      e.preventDefault();
      await createShortLink();
    }

    const getShortLinks = () => {
        setActive(true);
        getShortLink()
    }
       

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.title}>Сокращатель ссылок</h1>
            <p className={styles.subtitle}>Превратите длинные ссылки в короткие</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <input 
                    type="text" 
                    id="createLink"
                    value={userLink} 
                    onChange={e => setUserLink(e.target.value)}
                    placeholder="Введите вашу ссылку"
                    className={styles.createShortLink}
                />
                <Button type="submit" text={"Сократить"} />
            </div>
        </form>
         <Button text={"Показать все ссылки"} fn={getShortLinks} />

        {shortLink.length > 0 && (
             <>
            <div className={active ? "active": styles.linksSection}>
                <h2 className={styles.sectionTitle}>Ваши ссылки</h2>
                <div className={styles.linksGrid}>
                    {shortLink.map(item => (
                        <div key={item.id} className={styles.linkCard}>
                            <div className={styles.linkHeader}>
                                <span className={styles.clicksBadge}>{item.clicks_count} кликов</span>
                                <span className={styles.date}>{new Date(item.created_at).toLocaleDateString()}</span>
                            </div>
                            
                            <div className={styles.urlSection}>
                                <label className={styles.urlLabel}>Оригинальная ссылка:</label>
                                <p className={styles.originalUrl}>{item.original_url}</p>
                            </div>
                            <div className={styles.urlSection}>
                                <label className={styles.urlLabel}>Короткая ссылка:</label>
                                <div className={styles.shortUrlContainer}>
                                    <code 
                                    className={styles.shortUrl} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(`${API_BASE_URL}/links/${item.short_code}`, '_blank');
                                    }}
                                    >
                                    {item.short_code}
                                    </code>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => setActive(false)} className={active ? styles.btnActive: styles.btn}>Скрыть</button>
           </>
        )}
        <Button text={"Показать клики"} fn={getClicks} />
        {clicks.map(item => (
            <div key={item.id} className={styles.clicks}>
            <p className={styles.linkId}>ID: {item.id}</p>
            <p className={styles.linkId}>ID ссылки: {item.link_id}</p>
            <p className={styles.ipAddress}>IP Адресс: {item.ip_address}</p>
            <p className={styles.clickedAt}>Время нажатия: {item.clicked_at}</p>
            </div>
        ))}
    </div>
)
}

export default Profile