'use client'
import { annoucements } from '@/plugins/announcementData'
import { Annoucements } from '@/plugins/Types'
import React, { useEffect, useState } from 'react'

const Announcements = () => {
  const [announcement, setAnnoucement] = useState<Annoucements[]>([])

  useEffect(() => {
    const announcementData = annoucements
    setAnnoucement(announcementData)
  }, []);

  return (
    <div className='overflow-x-scroll'>
      <div className="flex gap-5 items-center w-[800px]">
        {announcement.map((announce) => (
          <div key={announce.id} className='bg-blue-800 text-white rounded-md shadow px-3 py-4 w-[300px]'>
            <h2 className='text-xl font-semibold underline'>
              {announce.headline}:
            </h2>
            <p className='py-3'>
              {announce.message}
            </p>
            {announce.cta && (
              <p className='underline' key={announce.id}>{announce.cta}</p>
            )}
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Announcements
