import Link from 'next/link'
import styles from '@/styles/header.module.css'
import Search from './Search'
import { useContext } from 'react'
import { AuthContext } from '@/context/Auth'

function Header() {
  const { user } = useContext(AuthContext)
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>DJ Events</Link>
      </div>
      <Search />
      <nav>
        {JSON.stringify(user) === JSON.stringify({}) ? (
          <ul>
            <li>
              <Link href='/events'>
                <a>Events</a>
              </Link>
            </li>
            <li>
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a>Log In</a>
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href='/dashboard'>
                <a>Dashboard</a>
              </Link>
            </li>

            <li>
              <Link href='/add'>
                <a>Add Events</a>
              </Link>
            </li>
            <li>
              <Link href='/logout'>
                <a>Logout</a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

export default Header
