import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <div>ifubfdfbol</div> */}
    </>
  )
}

export default MainLayout
