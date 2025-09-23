import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router';
import styles from "./Login.module.css";
import Button from '../../../UI/Button/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await loginUser({ email, password });
      if (result && result.success) {
        console.log("успешный вход")
      } else {
        setError(result?.error || 'Произошла ошибка');
      }
    } catch (error) {
      setError('Ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className={styles.background}></div>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.formTitle}>Вход</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={isLoading}
          />
          <input 
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            disabled={isLoading}
          />
          {error && <div className={styles.error}>{error}</div>}
          <Button 
            text={isLoading ? "Вход..." : "Войти"} 
            width={150} 
            height={45}
            type="submit"
            disabled={isLoading}
          />
        </form>
        <Link to={"/Registration"} className={styles.link}>Нет аккаунта? Регистрация</Link>
      </div>
    </div>
    </>
  );
};

export default Login;