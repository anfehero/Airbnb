import { Inter } from 'next/font/google'
import './globals.css'

import Navbar from '@/app/components/navbar/Navbar'
import ClientOnly from '@/app/components/ClientOnly'
import Modal from '@/app/components/modals/Modal'
import RegisterModal from '@/app/components/modals/RegisterModal'
import LoginModal from '@/app/components/modals/LoginModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './Actions/getCurrentUser'
import RentModal from '@/app/components/modals/RentModal'


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Inter({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
