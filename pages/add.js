import React, { useReducer } from 'react'
import styles from '@/styles/form.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const reducer = (state, action) => {
  switch (action.type) {
    case action.type: {
      return { ...state, [action.type]: action.payload }
    }
  }
}

const initialState = {
  name: '',
  performers: '',
  venue: '',
  address: '',
  date: '',
  time: '',
  description: '',
}

const handleChange = (e, dispatch) => {
  dispatch({ type: e.target.name, payload: e.target.value })
}
const handleSubmit = event => {
  console.log(event)
}

function Add() {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>

      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(state)
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
              type='time'
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
    </Layout>
  )
}

export default Add
