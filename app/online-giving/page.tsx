'use client'
import React from 'react'
import EditableText from '@/components/hooks/EditableText'

const page = () => {
  return (
    <div className='mt-24 mx-3'>
      <h1 className='text-3xl font-bold text-center'>
      <EditableText slug='donation_head' defaultText='Give to support our mission' />
      </h1>

      <p className='mt-5'>
        <EditableText slug='donation_message' defaultText="Your decision to give is more than just a donation; it's a vital investment in the mission and future of our church and community. Every gift directly fuels our ability to support essential outreach programs, maintain resources for spiritual growth, and sustain our worship services. By choosing to partner with us financially, you are actively participating in the work of spreading hope and making a tangible, positive difference right here in York, PA, and beyond. We are deeply grateful for your faithfulness and commitment to this shared purpose." />
      </p>
      

      <div className='flex flex-col justify-center items-center'>
        <h1 className='mt-7 text-center font-bold text-3xl'>
          <EditableText slug='donation_give1' defaultText='Text Give to 717-862-7372' />
        </h1>
        {/* <h1 className='mt-7 text-center font-bold text-3xl'>Text Give to <br /> <b>717-862-7372</b></h1> */}
        <span className='mt-3 text-xl font-semibold'>or</span>
        
        <h1 className='mt-7 text-center font-bold text-3xl'>
          <EditableText slug='donation_give2' defaultText='717-919-3033 (Zelle)' />
        </h1>

        {/* <p className='text-2xl font-semibold'>717-919-3033 (Zelle)</p> */}
        <span className='mt-3 text-xl font-semibold'>or</span>
        <p className='text-2xl font-semibold'><a href="https://cash.app/$rccgyork" className='text-red-500 underline'>$rccgyork</a> (CashApp)</p>
      </div>

      <img src="/cashapp.jpg" alt="cashapp qr code" className='mt-3' />
    </div>
  )
}

export default page
