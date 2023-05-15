import Head from 'next/head'
import React from 'react'
import Navbar from './navbar'

export default function Layout({ children, title = '', description = '', isOnLogin = false  }) {
  return (
    <>
      <Head>
        <title>HonduFreelance - {title}</title>
        <meta name='description' content={description} />
      </Head>
      <Navbar isOnLogin={isOnLogin} />
      <>
        { children }
      </>
    </>
  )
}
