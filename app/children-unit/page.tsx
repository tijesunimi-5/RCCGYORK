// page.tsx
'use client'
import React, { useState } from 'react'
import Image from 'next/image' // 1. Import Next.js Image for clarity
import ImagePreview from '../../components/hooks/ImagePreview'

// Interfaces remain the same
interface Teacher {
  name: string;
  post: string;
  image: string;
}

interface Media {
  id: number;
  image: string;
}

const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const teachers: Teacher[] = [
    { name: "Dr. Innocent Ononiwu", post: "Head of KidZone children's department", image: "/drinnocent.jpg" },
    { name: "Mrs. Helen Ugo-Onyeulo", post: "Age 3 - 5 teacher", image: "/children/helen.jpg" },
    { name: "Mrs. Bernarde Munoz", post: "Age 0 - 3 teacher", image: "/children/bern.jpg" },
    { name: "Mrs. Judith Arimi-Musembi", post: "Age 7 - 8 teacher", image: "/children/mjud.jpg" },
  ]

  const medias: Media[] = [
    { id: 1, image: "/children/child2.jpg" },
    { id: 2, image: "/children/child3.jpg" },
    { id: 3, image: "/children/child4.jpg" },
    { id: 4, image: "/children/child5.jpg" },
    { id: 5, image: "/children/child6.jpg" },
  ]

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center '>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      {/* Header Image Section - Using Image for clarity */}
      <div className='pt-20 h-[80vh] overflow-hidden relative w-screen'>
        {/* object-cover is fine here as it's a banner and cropping is expected/desired */}
        <Image
          src="/children/child.png"
          alt="Children Church"
          fill
          className='top-0 w-full h-full object-cover z-20'
        />
      </div>


      {/* Main Content Area (remains the same) */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Welcome to KidZone
        </h1>
        {/* ... (text content) ... */}
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          At RCCG Living Spring York Childen's Church, we create a dynamic, Christ-centered haven where children aged 2-12 grow in faith, character, and community. Our ministry blends Bible-based teachings, interactive activities, and creative learning to inspire young hearts toward a lifelong relationship with Jesus. Parents trust us to provide a secure, structured environment during services, allowing them to worship freely while their children embark on joyful spiritual adventures.
        </p>

        <h2 className='text-2xl mt-10 font-semibold'>Programs & Activities:</h2>

        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          From Sunday School lessons tailored to different age groups to our annual Vacation Bible School (VBS)-packed with games, music, crafts, and Scripture memorization - we make faith fun and relatable.
        </p>
      </div>


      {/* Teachers Section */}
      <div className="text-center mt-9 w-full">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Our Teachers
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          {teachers.map((teacher) => (
            <div key={teacher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
              <div
                className="w-full h-[450px] cursor-pointer relative" // Added relative
                onClick={() => handleImageClick(teacher.image)}
              >
                {/* 2. Changed object-cover to object-contain, using Next.js Image */}
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className='object-cover' // Ensures the WHOLE image is visible
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="content px-4 pb-4 text-start">
                <h2 className='font-semibold text-xl'>{teacher.name}</h2>
                <p className="mt-3">
                  <b>Post: </b>
                  {teacher.post}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medias Section */}
      <div className="text-center mt-9 mb-10 w-full">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Medias
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          {medias.map((media) => (
            <div
              key={media.id}
              className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative' // Added relative
              onClick={() => handleImageClick(media.image)}
            >
              {/* 3. Changed object-cover to object-contain, using Next.js Image */}
              <Image
                src={media.image}
                alt={`Media ${media.id}`}
                fill
                className='object-cover cursor-pointer' // Ensures the WHOLE image is visible
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page