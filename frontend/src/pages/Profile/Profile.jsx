import React, { useEffect } from 'react'
import { useLoginedUser } from '../../contexts/LoginedUserContexts';
import styles from "./Profile.module.css"
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContexts';

const Profile = () => {
    const { userLink,setUserLink, createShortLink, shortLink, getShortLink, shortLinkRedirect } = useLoginedUser();
  

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

        <Button text={"Показать все ссылки"} fn={getShortLink} />

        {shortLink.length > 0 && (
            <div className={styles.linksSection}>
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
                                    <code className={styles.shortUrl} onClick={() => shortLinkRedirect(item.short_code)}>{item.short_code}</code>
                                    {/* <Button
                                        text={"Копировать"}
                                        fn={() => shortLinkRedirect(item.))}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
)
}

export default Profile