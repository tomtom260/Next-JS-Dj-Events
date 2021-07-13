import React, { useState } from 'react'
import styles from '@/styles/form.module.css'
import { API_URL } from '../config'

const handleSubmit = async (id, image, closeModal, setPreview) => {
  const formData = new FormData()
  formData.append('files', image)
  formData.append('ref', 'events')
  formData.append('refId', id)
  formData.append('field', 'image')
  console.log(id, image)

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  })

  if (res.ok) {
    const { image: img } = await (await fetch(`${API_URL}/events/${id}`)).json()
    setPreview(img.formats.thumbnail.url)
    closeModal()
  }
}

function UploadImage({ id, closeModal, setPreview }) {
  const [image, setImage] = useState(null)
  return (
    <div>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(id, image, closeModal, setPreview)
        }}
      >
        <p>Select Image</p>
        <input
          onChange={e => {
            setImage(e.target.files[0])
          }}
          type='file'
        />
        <input type='submit' value='Upload' />
      </form>
    </div>
  )
}

export default UploadImage
