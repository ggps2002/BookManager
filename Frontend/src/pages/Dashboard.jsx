import React from 'react'
import Header from '../components/Dashboard/Header'
import Bookcards from '../components/Dashboard/Bookcards'
import Footer from '../components/Home/Footer'

function Dashboard() {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("userID")
  const username = queryParameters.get("username")
  return (
    <div className='bg-gradient-to-b from-orange-100 to-orange-50 ... h-screen overflow-x-hidden'>
      <div className='h-full w-full flex flex-col justify-between'>
        <div>
          <Header username={username} id={id} />
        </div>
        <div className='flex-grow'>
          <Bookcards id={id} />
        </div>
        <div className='w-full bg-gradient-to-b from-orange-100 to-orange-50 ... mt-8 p-3'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Dashboard