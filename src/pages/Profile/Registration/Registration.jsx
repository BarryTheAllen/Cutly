import { Link } from "react-router";
import styles from "./Registration.module.css";
import Button from "../../../UI/Button/Button";
import { useAuth } from "../../../contexts/AuthContexts";
import { useState } from "react";

const Registration = () => {
  const { registerUser, user } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setSuccessMessage("");
    
    let isValid = true;
    if (!email.includes('@')) {
      setEmailError("Введите корректный email");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);
      const result = await registerUser({ email, password });
      
      if (result.success) {
        setSuccessMessage(result.message || "Регистрация успешна!");
        setEmail("");
        setPassword("");
      } else {
        setEmailError(result.error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.formTitle}>Регистрация</p>
        
        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Введите email" 
            className={`${styles.input} ${emailError ? styles.inputError : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {emailError && <span className={styles.error}>{emailError}</span>}
          
          <input 
            type="password" 
            placeholder="Введите пароль" 
            className={`${styles.input} ${passwordError ? styles.inputError : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {passwordError && <span className={styles.error}>{passwordError}</span>}
          
          <Button 
            text={isLoading ? "Регистрация..." : "Регистрация"} 
            width={150} 
            height={45}
            disabled={isLoading}
            type="submit"
          />
        </form>
        <Link to="/login" className={styles.link}>
          Уже есть аккаунт? Войти
        </Link>
      </div>
    </div>
  );
};

export default Registration;