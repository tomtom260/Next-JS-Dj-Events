import styles from '@/styles/dashboardEvent.module.css'
import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

function DashboardEvent({ event }) {
  return (
    <Link href={`events/${event.slug}`}>
      <a>
        <div className={styles.event}>
          <h4>
            {event.name}
            <h4>
              Edit <FaTimes />
            </h4>
          </h4>
          <h4>
            Delete <FaPencilAlt />
          </h4>
        </div>
      </a>
    </Link>
  )
}

export default DashboardEvent
