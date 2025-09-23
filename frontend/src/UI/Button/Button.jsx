import styles from "./Button.module.css"

const Button = ({text, width, height}) => {
  return (
    <button className={styles.button} style={{width: width, height: height}}>
     {text}
    </button>
  )
}

export default Button