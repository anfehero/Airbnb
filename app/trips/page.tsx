import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../Actions/getCurrentUser";
import getReservations from "../Actions/getReservations";

import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please Login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  })

  if (reservations.length == 0) {
    <ClientOnly>
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips"
      />

    </ClientOnly>
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsPage