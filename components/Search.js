import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import styles from '@/styles/search.module.css'

function Search() {
  const router = useRouter()
  const ref = useRef(null)
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        router.push(`/search?term=${ref.current.value}`)
      }}
    >
      <input
        className={styles.search}
        ref={ref}
        type='text'
        placeholder='Search'
      />
    </form>
  )
}

export default Search
