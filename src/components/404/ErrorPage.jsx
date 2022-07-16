import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

export default function ErrorPage() {
  return (
    <>
    <Header />
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10rem', fontSize: '20px', fontWeight: '500'}}>Page not found</div>

    <Footer />
    </>
  )
}
