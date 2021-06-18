import Link from 'next/link'
import styles from '../styles/header.module.css'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>DJ Events</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
