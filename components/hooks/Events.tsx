'use client'
import React, { useEffect, useState } from 'react'
import { Event } from '@/plugins/Types'
import { EventData } from '@/plugins/eventData'

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    const eventData = EventData
    setEvents(eventData)
  }, [])
  return (
    <div className='overflow-x-scroll'>
      <div className="flex items-center gap-3 w-[800px]">
        {events.map((ev) => (
          <div key={ev.id} className='bg-blue-700 text-white rounded-md shadow px-3 py-4 w-[550px]'>
            <h2 className='text-xl font-semibold underline'>{ev.title}:</h2>
            <p className='pt-3'>
              {ev.description}
            </p>
            <span className='flex gap-1 mt-3'><b>Date: </b><p className="underline">{ev.date}</p></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
