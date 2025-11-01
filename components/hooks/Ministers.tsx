"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/Card'

const Ministers = () => {
  const ministers = [
    {
      id: 1,
      name: "Pst. Olusola Osundeko & Pst. Teniola Osundeko",
      image: "/senior.jpg",
      post: "Senior Pastors"
    }, {
      id: 2,
      name: "Dr. Innocent Ononiwu",
      image: "/drinnocent.jpg",
      post: "Head of KidZone Children's Department"
    },
    {
      id: 3,
      name: "Mrs. Modupeola Adeniji",
      image: "/wpres.jpg",
      post: "Women of Virtue President"
    },
    {
      id: 4,
      name: "Mrs. Helen Esohe Ugo-Onyeulo",
      image: "/wvpres.jpg",
      post: "Women of Virtue Vice President"
    },
    {
      id: 5,
      name: "Elder Quemilin Bull",
      image: "/elderque.jpg",
      post: ""
    },
    {
      id: 6,
      name: "Deaconness Amma Nsiah",
      image: "/Deaconess.jpg",
      post: ""
    },
    {
      id: 7,
      name: "Pastor Jumoke Obadofin-Thomas",
      image: "/pJum.jpg"
    },
    {
      id: 8,
      name: "Charles Kennedy",
      image: "/mCharles.jpg",
      post: "President of YASM (Young Adult and Single Ministry)"
    }
  ]
  return (
    <div id='ministers' className='py-2 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden'>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='text-center mb-16'>
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our Ministers
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get to meet our ministers.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {ministers.map((minister) => (
          <div key={minister.id} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'>
            <div className='w-full'>
              <img src={minister.image} alt={minister.name} className='h-[300px] w-full' />
            </div>
            <div className="content px-2 pb-1">
              <h2 className='font-semibold text-xl'>{minister.name}</h2>
              {minister.post && (
                <p className='mt-3'>Post: {minister.post}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ministers
