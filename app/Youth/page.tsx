// page.tsx
'use client'
import React, { useState } from 'react'
import Image from 'next/image' // Import Next.js Image Component
import ImagePreview from '../../components/hooks/ImagePreview'

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
    { name: "Simisola Adebayo", post: "Youth Coordinator", image: "/youth/simi.jpg" },
    { name: "Ivie Edebiri", post: "Teacher", image: "/youth/ivie.jpg" },
    { name: "Olive Gray", post: "Teacher", image: "/youth/olive.jpg" },
    { name: "Arinola Ogunneye", post: "Teacher", image: "/youth/ogunneye.jpg" }
  ]

  const medias: Media[] = [
    { id: 1, image: "/youth/yimg.jpg" },
    { id: 2, image: "/youth/yimg2.jpg" },
    { id: 3, image: "/youth/nyimg3.jpg" },
  ]

  const youthPastor = {
    name: "Pastor Jumoke Obadofin-Thomas",
    post: "Youth Pastor",
    image: "/youth/ypas.jpg"
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center pt-20'>

      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      {/* Header Image Section */}
      <div className=' h-[75vh] overflow-hidden relative w-screen'>
        {/* Use Image component for optimization and fill for banner */}
        <Image
          src="/youth/youth-bg.jpg"
          alt="Youth Banner"
          fill
          className=' top-0 w-full h-full object-cover z-20'
        />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Welcome to Youth Three Sixteen
        </h1>
        <p className=' text-gray-700 max-w-3xl mx-auto leading-relaxed text-center'>
          Welcome to the Youth Church: Three Sixteen (3:16) Army!
        </p>

        {/* Youth Pastor/President Card Section */}
        <div className='flex justify-center items-center flex-col my-5 px-4'>
          <h2 className='text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6'>Our Pastor</h2>
          {/* Card responsiveness similar to President card: max-w-xs to max-w-md */}
          <div className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 w-full max-w-xs sm:max-w-sm md:max-w-md'>
            <div
              className='w-full h-[500px] relative cursor-pointer' // Relative container, fixed height
              onClick={() => handleImageClick(youthPastor.image)}
            >
              {/* Image with fill and object-cover */}
              <Image
                src={youthPastor.image}
                alt={youthPastor.name}
                fill
                className='object-cover'
              />
            </div>
            <div className="content px-4 pb-4 bg-white bg-opacity-50 text-start">
              <h1 className='font-semibold text-xl'>{youthPastor.name}</h1>
              <p className="mt-3"><b>Post: </b>{youthPastor.post}</p>
            </div>
          </div>
        </div>


        <p className=' text-gray-700 max-w-3xl mx-auto leading-relaxed text-center'>
          Aligned with RCCG's vision, we empower teens to live as bold, godly leaders.
          Through Scripture-based teachings, testimonies, and small groups, we tackle real-life challenges - peer pressure, identity, purpose - and discover biblical solutions. Our focus on prayer, accountability, and John 3:16 ("For God so love the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.") builds resilience and unwavering faith and love.
        </p>


        {/* Teachers Section */}
        <div className="text-center mt-9 w-full">
          <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our Teachers
          </h2>

          {/* Responsive Grid Setup */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            {teachers.map((teacher) => (
              <div key={teacher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
                <div
                  className="w-full h-[300px] cursor-pointer relative" // Fixed height, relative
                  onClick={() => handleImageClick(teacher.image)}
                >
                  {/* Image with fill and object-cover */}
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className='object-cover'
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

          {/* Responsive Grid Setup */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            {medias.map((media) => (
              <div
                key={media.id}
                className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative' // aspect-square, relative
                onClick={() => handleImageClick(media.image)}
              >
                {/* Image with fill and object-cover */}
                <Image
                  src={media.image}
                  alt={`Media ${media.id}`}
                  fill
                  className='object-cover cursor-pointer'
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page