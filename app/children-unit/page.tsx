// page.tsx (KidZone Page)
'use client'
import React, { useState } from 'react'
import ImagePreview from '../../components/hooks/ImagePreview'
import Image from 'next/image' // Used for static fallback images if needed

import EditableText from '@/components/hooks/EditableText'
import EditableImage from '@/components/hooks/EditableImage'
import EditableImageList from '@/components/hooks/EditableImageList'


const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Default data for the teacher list (used if DB is empty)
  const defaultTeachers = [
    { url: "/drinnocent.jpg", alt: "Dr. Innocent Ononiwu", post: "Head of KidZone children's department" },
    { url: "/children/helen.jpg", alt: "Mrs. Helen Ugo-Onyeulo", post: "Age 3 - 5 teacher" },
    { url: "/children/bern.jpg", alt: "Mrs. Bernarde Munoz", post: "Age 7 - 9 teacher" },
    { url: "/children/fosua.jpg", alt: "Mrs. Fosua Amoah-Mensah", post: "Age 0 - 3 teacher" },
    { url: "/children/mjud.jpg", alt: "Mrs. Judith Arimi-Musembi", post: "Age 7 - 8 teacher" },
    { url: "/children/lara.jpg", alt: "Mrs. Lara Adebanjo", post: "Age 7 - 8 teacher" },
  ];

  // Default data for the media gallery
  const defaultMedia = [
    { url: "/children/child2.jpg", alt: "Children playing" },
    { url: "/children/child3.jpg", alt: "Children group" },
    { url: "/children/child4.jpg", alt: "Children learning" },
    { url: "/children/child5.jpg", alt: "Children singing" },
    { url: "/children/child6.jpg", alt: "Children activity" },
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      {/* Header Image Section - NOW EDITABLE */}
      <div className='pt-20 h-[80vh] overflow-hidden relative w-screen'>
        <EditableImage
          slug="kidzone_banner" // UNIQUE SLUG
          defaultUrl="/children/child.png"
          defaultAlt="Children Church Banner"
          priority
        />
      </div>

      {/* Main Content Area */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          <EditableText slug="kidzone_title" defaultText="Welcome to KidZone" /> {/* EDITABLE TITLE */}
        </h1>

        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          <EditableText
            slug="kidzone_intro" // EDITABLE PARAGRAPH
            defaultText="At RCCG Living Spring York Childen's Church, we create a dynamic, Christ-centered haven where children aged 2-12 grow in faith, character, and community. Our ministry blends Bible-based teachings, interactive activities, and creative learning to inspire young hearts toward a lifelong relationship with Jesus. Parents trust us to provide a secure, structured environment during services, allowing them to worship freely while their children embark on joyful spiritual adventures."
          />
        </p>

        <h2 className='text-2xl mt-10 font-semibold'>
          <EditableText slug="kidzone_programs_heading" defaultText="Programs & Activities:" /> {/* EDITABLE SUBTITLE */}
        </h2>

        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          <EditableText
            slug="kidzone_programs_content" // EDITABLE PARAGRAPH
            defaultText="From Sunday School lessons tailored to different age groups to our annual Vacation Bible School (VBS)-packed with games, music, crafts, and Scripture memorization - we make faith fun and relatable."
          />
        </p>
      </div>


      {/* Teachers Section - NOW EDITABLE LIST */}
      <div className="text-center mt-9 w-full">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <EditableText slug="kidzone_teachers_heading" defaultText="Our Teachers" /> {/* EDITABLE TITLE */}
        </h2>

        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          <EditableImageList
            slug="kidzone_teachers"
            defaultImages={defaultTeachers.map(t => ({ url: t.url, alt: t.alt }))}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      {/* Medias Section - NOW EDITABLE LIST */}
      <div className="text-center mt-9 mb-10 w-full">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <EditableText slug="kidzone_gallery_heading" defaultText="Medias" /> {/* EDITABLE TITLE */}
        </h2>

        {/* Replaced medias.map with EditableImageList */}
        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          <EditableImageList
            slug="kidzone_gallery" // UNIQUE SLUG for the media gallery
            defaultImages={defaultMedia}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Page