import Head from 'next/head'
import styles from '@/styles/Layout.module.css'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'
import Showcase from './Showcase'

function Layout({ title, description, keywords, children }) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords}></meta>
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | hottest parties in town',
  description: 'Find the latest dj and other musical events',
  keywords: 'events music edm dj',
}

export default Layout
