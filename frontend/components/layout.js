import Head from 'next/head'
import React from 'react'

export default function Layout({ children, title = '', description = ''  }) {
  return (
    <>
      <Head>
        <title>HonduFreelance - {title}</title>
        <meta name='description' content={description} />
      </Head>

      <>
        { children }
      </>
    </>
  )
}
