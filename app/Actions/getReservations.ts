import prisma from '@/app/libs/prismadb'

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(
  params: IParams
) {

  try {

    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.authorId = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc'
      }

    })
    const SafeReservation = reservations.map((reservation) => ({
      ...reservation,
      createAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toDateString(),
      endDate: reservation.endDate.toDateString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toDateString()
      }
    })
    )

    return SafeReservation
  } catch (error: any) {
    throw new Error(error)
  }
}