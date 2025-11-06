// Ministers.tsx
"use client"
import React from 'react'
import Image from 'next/image' // 1. Import Next.js Image Component
import { Card, CardContent, CardHeader, CardTitle } from '../UI/Card' // Assuming this path is correct

// Define the interface for Minister data
interface Minister {
  id: number;
  name: string;
  image: string;
  post?: string; // post is optional
}

const Ministers: React.FC = () => {
  const ministers: Minister[] = [
    {
      id: 1,
      name: "Pst. Olusola Osundeko & Pst. Teniola Osundeko",
      image: "/nsnr.jpg",
      post: "Senior Pastors"
    },
    {
      id: 2,
      name: "Pastor Kayode Adewumi",
      image: "/pkayode.jpg",
      post: "Resident Pastor"
    },
    {
      id: 3,
      name: "Pastor Olalekan Aderibigbe",
      image: "/plekan.jpg",
      post: "Assistant Pastor"
    },
    {
      id: 5,
      name: "Elder Quemiline Bull",
      image: "/elderque.jpg",
      post: "Elder"
    },
    {
      id: 6,
      name: "Deaconness Amma Nsiah",
      image: "/Deaconess.jpg",
      post: "Deaconess"
    },
    {
      id: 7,
      name: "Pastor Jumoke Obadofin-Thomas",
      image: "/pJum.jpg",
      post: "Assistant Pastor"
    },
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

      {/* Adjusted Grid for Responsiveness: 1 col (default) -> 2 cols (md) -> 4 cols (lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {ministers.map((minister) => (
          <div
            key={minister.id}
            className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'
          >
            {/* 2. Parent Container Setup: Must be relative and have dimensions */}
            <div className='w-full h-[400px] relative'>
              {/* 3. Replace <img> with Image component, using fill and object-cover */}
              <Image
                src={minister.image}
                alt={minister.name}
                fill // Fills the parent div
                className='object-cover' // Ensures the image fits perfectly without distortion
                sizes="(max-width: 768px) 50vw, 25vw" // Optimizes image delivery
              />
            </div>
            <div className="content px-4 pb-4 text-start"> {/* Adjusted padding */}
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