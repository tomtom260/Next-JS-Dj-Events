import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

const deleteEvent = e => {
  console.log('delete event')
}

function Event({ evt }) {
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> DeleteEvent
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt?.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image alt='event image' src={evt.image} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
      </div>

      <Link href='/events'>
        <a className={styles.back}>{'<'} Go Back </a>
      </Link>
    </Layout>
  )
}

// const deleteEve

export default Event

export async function getStaticPaths() {
  const paths = (
    await (await fetch('http://localhost:3000/api/events')).json()
  ).map(evt => ({
    params: { slug: evt.slug },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const evt = await (
    await fetch(`http://localhost:3000/api/events/${slug}`)
  ).json()
  return {
    props: {
      evt,
    },
  }
}
