import EventItem from '@/components/EventItem'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

function homePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <h3>No Upcoming Events</h3>
      ) : (
        <>
          {events.map(evt => (
            <EventItem key={evt.id} evt={evt} />
          ))}
          <Link href='/events'>
            <a className='btn-secondary'>View More</a>
          </Link>
        </>
      )}
    </Layout>
  )
}

export default homePage

export async function getStaticProps() {
  const events = await (
    await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  ).json()
  return {
    props: {
      events,
    },
  }
}
