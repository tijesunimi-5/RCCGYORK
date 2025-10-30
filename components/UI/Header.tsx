'use client'
import React from 'react'
import { FaBars } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='bg-blue-900 text-white py-1 px-3 flex justify-between items-center fixed top-0 left-0 right-0'>
      <div className="logo text-2xl font-semibold">Living Spring</div>

      <FaBars className='text-2xl' />
    </header>
  )
}

export default Header
