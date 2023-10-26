import Head from 'next/head'

import { Inter } from 'next/font/google'
import MenuAktif from '@/utils/MenuAktif'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MenuAktif menu="dashboard" />


    </>
  )
}
