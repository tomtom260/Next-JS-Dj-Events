import React, { useReducer, useState } from 'react'
import styles from '@/styles/form.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/config/index'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import Modal from '@/components/Modal'
import UploadImage from '@/components/UploadImage'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case type: {
      return { ...state, [type]: payload }
    }
  }
}

const handleChange = (e, dispatch) => {
  dispatch({ type: e.target.name, payload: e.target.value })
}
const handleSubmit = async (event, router) => {
  const {
    query: { id },
  } = router

  let hasEmptyField = false
  Object.keys(event).forEach(arg => {
    if (event[arg] === '') {
      toast.error(`${arg} field is empty!`)
      hasEmptyField = true
    }
  })

  if (hasEmptyField) return

  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })

  if (!res.ok) {
    toast.error('Something Went Wrong')
    return
  }

  const evt = await res.json()
  router.push(`/events/${evt.slug}`)
}

function EditEventPage({ evt }) {
  const router = useRouter()
  const initialState = {
    name: evt.name,
    description: evt.description,
    venue: evt.venue,
    time: evt.time,
    date: evt.date,
    performers: evt.performers,
    address: evt.address,
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [showModal, setShowModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(
    evt.image?.formats.thumbnail.url
  )
  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <ToastContainer hideProgressBar />
      <h1>Add Event</h1>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(state, router)
        }}
      >
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              value={state.name}
              onChange={e => handleChange(e, dispatch)}
              type='text'
              name='name'
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              value={state.performers}
              onChange={e => handleChange(e, dispatch)}
              type='text'
              name='performers'
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              value={state.venue}
              onChange={e => handleChange(e, dispatch)}
              type='text'
              name='venue'
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              value={state.address}
              onChange={e => handleChange(e, dispatch)}
              type='text'
              name='address'
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              value={state.date}
              onChange={e => handleChange(e, dispatch)}
              type='date'
              name='date'
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              value={state.time}
              onChange={e => handleChange(e, dispatch)}
              type='text'
              name='time'
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            value={state.description}
            onChange={e => handleChange(e, dispatch)}
            name='description'
          ></textarea>
        </div>
        <input type='submit' value='Add Event' className='btn' />
      </form>
      {imagePreview ? (
        <div>
          <p>image uploaded</p>
          <Image
            alt='event image'
            src={imagePreview}
            width={170}
            height={100}
          />
        </div>
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <UploadImage
          id={evt.id}
          closeModal={() => setShowModal(false)}
          setPreview={setImagePreview}
        />
      </Modal>

      <button onClick={() => setShowModal(true)} className='btn-secondary'>
        <FaImage /> upload image
      </button>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const evt = await (await fetch(`${API_URL}/events/${id}`)).json()

  return {
    props: {
      evt,
    },
  }
}

export default EditEventPage
