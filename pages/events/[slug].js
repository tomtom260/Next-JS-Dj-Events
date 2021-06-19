import Layout from '@/components/Layout'
function Event({ evt }) {
  return (
    <Layout>
      <h1>{evt?.name}</h1>
    </Layout>
  )
}

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
