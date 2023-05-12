'use client'

import Container from "../components/Container"
import { SafeReservations, SafeUser } from "../types"
import Heading from "../components/Heading"

import axios from 'axios'

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps {
  reservations: SafeReservations[]
  currentUser: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()

  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservatio cancelled')
        router.refresh()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('')
      })
  }, [router])

  return (

    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've beend and where you're going"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
          key={reservation.id}
            data={reservation.Listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient