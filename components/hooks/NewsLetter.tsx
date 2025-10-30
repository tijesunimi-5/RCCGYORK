'use client'
import React from 'react'

const NewsLetter = () => {
  return (
    <div className='mx-3 mb-20'>
      <h1 className='text-xl font-semibold mb-3'>
        Sign up for the latest news and updates.
      </h1>
      <form className='bg-blue-600 px-2 rounded-md shadow flex flex-col'>
        <div className="inputbox pt-5">
          <input required type="text" />
          <span>First Name<b className="text-red-500">*</b></span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="text" />
          <span>Last Name<b className="text-red-500">*</b></span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="number" />
          <span>Phone Number</span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="email" />
          <span>E-mail Address<b className="text-red-500">*</b></span>
          <i></i>
        </div>

        <button className="mt-4 flex w-full mb-5 rounded-lg py-1 text-center items-center justify-center font-bold text-xl bg-white text-blue-900">Join</button>
      </form>
    </div>
  )
}

export default NewsLetter
