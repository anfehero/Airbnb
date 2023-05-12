import { User, Listing, Reservation } from "@prisma/client";

export type SafeListing = Omit<
Listing,
'createdAt'
> & {
  createdAt:string
}

export type SafeReservations = Omit <
Reservation,
'createdAte' | 'starDate' | 'endDate'
> & {
  createdAt: string
  startDate: string
  endDate: string
  Listing: SafeListing
}

export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

