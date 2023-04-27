import { User } from "@prisma/client";

export type safeUser = Omit<
User,
'CreatedAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}
