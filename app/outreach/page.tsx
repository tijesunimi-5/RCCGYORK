'use client'
import ImagePreview from '@/components/hooks/ImagePreview';
import Image from 'next/image';
import React, { useState } from 'react'

interface Teacher {
  name: string;
  post: string;
  image: string;
}

interface Media {
  id: number;
  image: string;
}

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const kenyaTrip = [
    { id: 1, image: "/outreach/kenya.jpg" },
    { id: 2, image: "/outreach/kenya2.jpg" },
    { id: 3, image: "/outreach/kenya3.jpg" },
  ]

  const outreaches = [
    { id: 1, image: "/outreach/outreach.jpg" },
    { id: 2, image: "/outreach/outreach2.jpg" },
    { id: 3, image: "/outreach/outreach3.jpg" },
    { id: 4, image: "/outreach/outreach4.jpg" },
    { id: 5, image: "/outreach/outreach5.jpg" },
    { id: 6, image: "/outreach/outreach6.jpg" },
  ]

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      {/* Header Image Section - Using Image for clarity */}
      <div className='pt-20 h-[80vh] overflow-hidden relative w-screen'>

        <Image
          src="/children/child.png"
          alt="Children Church"
          fill
          className='top-0 w-full h-full object-cover z-20'
        />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Outreach
        </h1>
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          We are a Christ-centered, love-driven church, shining God's light through acts of compassion and shared responsibilty - within our church family, and across local and global communities. (Galatians 6:10)
        </p>

        <h2>Misson Trip To Kenya</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          {kenyaTrip.map((kenya) => (
            <div key={kenya.id} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
              <Image
                src={kenya.image}
                alt={kenya.image}
                fill
                className='object-cover'
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
