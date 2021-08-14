import Layout from '@/components/Layout'
import cookie from 'cookie'
import { API_URL } from '@/config/index'
import styles from '@/styles/dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent'

function Dashboard({ events }) {
  console.log(events)
  return (
    <Layout title='User DashBoard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt, i) => (
          <DashboardEvent key={i} event={evt} />
        ))}
      </div>
    </Layout>
  )
}
export default Dashboard

export async function getServerSideProps({ req }) {
  const { token } = cookie.parse(req.headers.cookie)
  console.log(token)
  if (!token) {
    //serverside redirection
  }

  const events = await (
    await fetch(`${API_URL}/events/me`, {
      method: 'GET',
      headers: {
        Authorizarion: `Bearer ${token}`,
      },
    })
  ).json()

  return {
    props: {
      events,
    },
  }
}
