import Link from 'next/link'
import styles from '@/styles/header.module.css'
import Search from './Search'
import { useContext } from 'react'
import { AuthContext } from '@/context/Auth'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

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
              <Link href='/accounts/login'>
                <a className='btn btn-secondary'>
                  <FaSignInAlt /> Log In
                </a>
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
              <Link href='/accounts/logout'>
                <a className='btn btn-secondary'>
                  <FaSignOutAlt /> Logout
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

export default Header
