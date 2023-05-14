
import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
  try {
    const currentuser = await getCurrentUser()

    if(!currentuser){
      return []
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id:{
          in: [...(currentuser.favoriteIds || [])]
        }
      }
    })

    const safeFavorites = favorites.map((favorites) => ({
      ...favorites,
      createdAt: favorites.createdAt.toISOString()
    }))
    return safeFavorites
  } catch (error: any){
    throw new Error(error)
  }


}