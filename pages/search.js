import Link from 'next/link'
import { useRouter } from 'next/router'
import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import qs from 'qs'

function SearchPage({ events }) {
  const router = useRouter()
  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go back</Link>
      <h1>{`Search Results for ${router.query.term}`}</h1>
      {events.length === 0 ? (
        <h3>No Results</h3>
      ) : (
        events.map(evt => <EventItem key={evt.id} evt={evt} />)
      )}
    </Layout>
  )
}

export default SearchPage

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { venue_contains: term },
        { performers_contains: term },
        { description_contains: term },
      ],
    },
  })
  const events = await (
    await fetch(`${API_URL}/events?${query}_sort=date:ASC`)
  ).json()
  return {
    props: {
      events,
    },
  }
}
