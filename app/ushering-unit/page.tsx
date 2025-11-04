'use client'
import React, { useState } from 'react'
import ImagePreview from '@/components/hooks/ImagePreview'

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const ushers = [
    { name: "Mr. Sekou Kromah", post: "Head of ushering department", image: "/ushers/usher.jpg" },
    { name: "Mrs. Belinda Nebedum", post: "Usher", image: "/ushers/usher2.jpg" },
    { name: "Mrs. Kehinde Kalejaiye", post: "Usher", image: "/ushers/usher3.jpg" },
    { name: "Mr. Idahosa Prince", post: "Usher", image: "/ushers/usher4.jpg" },
  ]

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      <div className="text-center pt-20">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Our Teachers
        </h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
          {ushers.map((usher) => (
            <div key={usher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'>
              <div
                className="w-full cursor-pointer"
                onClick={() => handleImageClick(usher.image)}
              >
                <img src={usher.image} alt={usher.name} className='h-[300px] w-full object-cover' />
              </div>
              <div className="content px-2 pb-1 text-start">
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

export default page
