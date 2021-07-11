import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <h3>No Upcoming Events</h3>
      ) : (
        events.map(evt => <EventItem key={evt.id} evt={evt} />)
      )}
    </Layout>
  )
}

export default EventsPage

export async function getStaticProps() {
  const events = await (await fetch(`${API_URL}/events?_sort=date:ASC`)).json()
  return {
    props: {
      events,
    },
  }
}
