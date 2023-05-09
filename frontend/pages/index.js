import { Inter } from 'next/font/google'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout title='Home' description='Profesionales Autónomos'>
      <h1>Hello World - HonduFrelance</h1>
    </Layout>
  )
}
