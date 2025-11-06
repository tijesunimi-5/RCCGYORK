// page.tsx
'use client'
import React, { useState } from 'react'
import Image from 'next/image' // 1. Import Next.js Image Component
import ImagePreview from '@/components/hooks/ImagePreview' // Assuming this path is correct

// Define the interface for Usher data
interface Usher {
  name: string;
  post: string;
  image: string;
}

const Page: React.FC = () => {
  // Use explicit typing for useState
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use the Usher interface for data typing
  const ushers: Usher[] = [
    { name: "Mr. Sekou Kromah", post: "Head of ushering department", image: "/ushers/usher.jpg" },
    { name: "Mrs. Belinda Nebedum", post: "Usher", image: "/ushers/usher2.jpg" },
    { name: "Mrs. Kehinde Kalejaiye", post: "Usher", image: "/ushers/usher3.jpg" },
    { name: "Mr. Idahosa Prince", post: "Usher", image: "/ushers/usher4.jpg" },
    { name: "Mrs. Tomiwa Adewunmi", post: "Usher", image: "/ushers/utom.jpg" },
  ]

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    // Ensure root container is responsive
    <div className='w-full flex flex-col items-center mb-20'>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      <div className="text-center pt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-10">
          Our Ushers
        </h2>

        {/* Responsive Grid Setup: 1 col on small, 2 on medium, 4 on large */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {ushers.map((usher) => (
            <div key={usher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
              <div
                className="w-full h-[300px] cursor-pointer relative" // Added relative for Next/Image fill
                onClick={() => handleImageClick(usher.image)}
              >
                {/* 2. Swapped <img> for Next.js Image with fill and object-cover */}
                <Image
                  src={usher.image}
                  alt={usher.name}
                  fill // Fills the parent 300px container
                  className='object-cover' // Guarantees no empty space, cropping if necessary
                  sizes="(max-width: 768px) 50vw, 25vw" // For image optimization
                />
              </div>
              <div className="content px-4 pb-4 text-start"> {/* Adjusted padding for better look */}
                <h2 className='font-semibold text-xl'>{usher.name}</h2>
                <p className="mt-3">
                  <b>Post: </b>
                  {usher.post}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page