import EventItem from '@/components/EventItem'
import Link from 'next/link'
import Layout from '@/components/Layout'

function homePage({ events }) {
  console.log(events)
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

export default homePage

export async function getServerSideProps() {
  const events = (
    await (await fetch('http://localhost:3000/api/events')).json()
  ).slice(0, 3)
  return {
    props: {
      events,
    },
  }
}
