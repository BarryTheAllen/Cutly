import styles from "./Button.module.css"

const Button = ({text, width, height, fn}) => {
  return (
    <button className={styles.button} style={{width: width, height: height}} onClick={fn}>
     {text}
    </button>
  )
}

export default Button