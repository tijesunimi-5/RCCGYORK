// page.tsx
'use client'
import React, { useState } from 'react'
import Image from 'next/image' // IMPORT NEXT.JS IMAGE
import ImagePreview from '@/components/hooks/ImagePreview'

// Define interfaces for your data structures
interface Media {
  id: number;
  image: string;
}

const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const medias: Media[] = [
    { id: 1, image: "/youth/yimg4.jpg" },
    { id: 2, image: "/youth/yimg5.jpg" },
    { id: 3, image: "/youth/yimg6.jpg" },
    { id: 4, image: "/youth/yimg7.jpg" },
  ]

  const president = {
    name: "Mr Charles Kennedy",
    post: "Youth President",
    image: "/mCharles.jpg"
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center mb-20'>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      {/* Header Image Section */}
      {/* Container must be relative and have dimensions */}
      <div className='pt-20 h-[80vh] overflow-hidden relative w-screen'>
        {/* Swapped <img> for Next.js Image with fill prop */}
        <Image
          src="/youth/yasm.png"
          alt="Youth Adults & Single Ministry"
          fill
          className='top-0 w-full h-full object-cover z-20'
        />
      </div>

      {/* Background Blurs (Kept original positioning) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Main Content Introduction */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full'>
        {/* ... (Text content remains the same) ... */}
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Welcome to Young Adults & Single Ministry
        </h1>
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance text-center'>
          The Young Adults and Single Ministry at Living Spring, York is a place where young adults (ages 19 to 40), professionals, and university students unite to ignite their faith and shine as beacons of light in a generation hungry for Jesus Christ's glory! We are a vibrant, Christ-centered community passionate about making God's kingdom a reality in our lives and our world.
        </p>
      </div>

      {/* President's Card Section */}
      <div className='flex justify-center items-center flex-col my-12 px-4 w-full'>
        <h2 className='text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6'>Our President</h2>

        {/* 1. Adjusted Responsive Width Classes for the Card */}
        <div className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 w-full max-w-xs sm:max-w-sm md:max-w-md'>
          <div
            // Parent container remains relative and maintains fixed height
            className='w-full h-[500px] cursor-pointer relative'
            onClick={() => handleImageClick(president.image)}
          >
            {/* Image sizing: uses fill to perfectly cover the parent container */}
            <Image
              src={president.image}
              alt={president.name}
              fill
              className='object-cover'
            />
          </div>
          <div className="content px-4 pb-4 bg-white bg-opacity-50 text-start">
            <h1 className='font-semibold text-xl'>{president.name}</h1>
            <p className="mt-3"><b>Post: </b>{president.post}</p>
          </div>
        </div>
      </div>

      {/* Continuation Text */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative my-8 w-full'>
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-center'>
          We are privileged to hold YASM services one Sunday per month, where we officiate every aspect of church as we pass vital kingdom messages! Whether you're seeking fellowship, purpose, or meaningful connections, YASM empowers you to live boldly for Christ while building lifelong friendships with like-minded believers.
        </p>
      </div>

      {/* Medias Section */}
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8'>
        <h2 className='text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center mb-6'>Medias</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {medias.map((media) => (
            <div
              key={media.id}
              className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative' // Added relative
              onClick={() => handleImageClick(media.image)} // Click handler on the container
            >
              {/* Swapped <img> for Next.js Image with fill prop */}
              <Image
                src={media.image}
                alt={`Media ${media.id}`}
                fill
                className='object-cover cursor-pointer'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page