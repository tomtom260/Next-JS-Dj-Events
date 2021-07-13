import Link from 'next/link'

function Pagination({ page, total }) {
  return (
    <div>
      {+page !== 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a href='#' className='btn-secondary'>
            Prev
          </a>
        </Link>
      )}
      {+page !== total && (
        <Link href={`/events?page=${+page + 1}`}>
          <a href='#' className='btn-secondary'>
            Next
          </a>
        </Link>
      )}
    </div>
  )
}

export default Pagination
