import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'
import { FaExclamationTriangle } from 'react-icons/fa'

function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>There is nothing here</h4>
        <Link href='/'>
          <a>Go back Home</a>
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
