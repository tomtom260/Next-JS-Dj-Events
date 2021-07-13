import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Pagination from '@/components/Pagination'
const PER_PAGE = 2

function EventsPage({ events, total, page }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <h3>No Upcoming Events</h3>
      ) : (
        events.map(evt => <EventItem key={evt.id} evt={evt} />)
      )}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export default EventsPage

export async function getServerSideProps({ query: { page = 1 } }) {
  const count = await (await fetch(`${API_URL}/events/count`)).json()
  const total = Math.ceil(count / PER_PAGE)
  const events = await (
    await fetch(
      `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${
        (page - 1) * PER_PAGE
      }`
    )
  ).json()
  return {
    props: {
      events,
      total,
      page,
    },
  }
}
