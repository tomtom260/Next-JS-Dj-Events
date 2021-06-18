import Link from 'next/link'
import styles from '../styles/footer.module.css'

function Footer() {
  return (
    <div className={styles.footer}>
      <p>Copyright &copy; DJ Events 2021</p>
      <Link href='/about'>
        <a>About this project</a>
      </Link>
    </div>
  )
}

export default Footer
