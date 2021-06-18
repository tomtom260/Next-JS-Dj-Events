import { keyword } from 'color-convert'
import Head from 'next/head'

function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords}></meta>
      </Head>
      {children}
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | hottest parties in town',
  description: 'Find the latest dj and other musical events',
  keywords: 'events music edm dj',
}

export default Layout
