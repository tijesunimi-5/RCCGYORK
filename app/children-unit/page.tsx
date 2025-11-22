// page.tsx (KidZone Page)
'use client'
import React, { useState } from 'react'
import ImagePreview from '../../components/hooks/ImagePreview'
import Image from 'next/image'

import EditableText from '@/components/hooks/EditableText'
import EditableImage from '@/components/hooks/EditableImage'
import EditableImageList from '@/components/hooks/EditableImageList' // Keep this for the gallery

const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Default data for the teacher list (USED FOR DEFAULT PROPS ONLY)
  const defaultTeachers = [
    { url: "/drinnocent.jpg", name: "Dr. Innocent Ononiwu", post: "Head of KidZone children's department" },
    { url: "/children/helen.jpg", name: "Mrs. Helen Ugo-Onyeulo", post: "Age 3 - 5 teacher" },
    { url: "/children/bern.jpg", name: "Mrs. Bernarde Munoz", post: "Age 7 - 9 teacher" },
    { url: "/children/fosua.jpg", name: "Mrs. Fosua Amoah-Mensah", post: "Age 0 - 3 teacher" },
    { url: "/children/mjud.jpg", name: "Mrs. Judith Arimi-Musembi", post: "Age 7 - 8 teacher" },
    { url: "/children/lara.jpg", name: "Mrs. Lara Adebanjo", post: "Age 7 - 8 teacher" },
  ];

  // Default data for the media gallery
  const defaultMedia = [
    { url: "/children/child2.jpg", alt: "Children playing" },
    { url: "/children/child3.jpg", alt: "Children playing" },
    { url: "/children/child4.jpg", alt: "Children playing" },
    { url: "/children/child5.jpg", alt: "Children playing" },
    { url: "/children/child6.jpg", alt: "Children playing" },
    { url: "/children/child7.jpg", alt: "Children playing" },
    { url: "/children/child8.jpg", alt: "Children playing" },
    { url: "/children/child9.jpg", alt: "Children playing" },
    { url: "/children/child10.jpg", alt: "Children playing" },
    { url: "/children/child11.jpg", alt: "Children playing" },
    // ... rest of media
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {/* ... ImagePreview and Header Image Sections (Unchanged) ... */}

      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />

      <div className='pt-20 h-[80vh] overflow-hidden relative w-screen'>
        <EditableImage slug="kidzone_banner" defaultUrl="/children/child.png" defaultAlt="Children Church Banner" priority />
      </div>

      {/* Main Content Area (Unchanged) */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          <EditableText slug="kidzone_title" defaultText="Welcome to KidZone" />
        </h1>
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          <EditableText slug="kidzone_intro" defaultText="At RCCG Living Spring York Childen's Church, we create a dynamic, Christ-centered haven where children aged 2-12 grow in faith, character, and community..." />
        </p>
        <h2 className='text-2xl mt-10 font-semibold'>
          <EditableText slug="kidzone_programs_heading" defaultText="Programs & Activities:" />
        </h2>
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance'>
          <EditableText slug="kidzone_programs_content" defaultText="From Sunday School lessons tailored to different age groups..." />
        </p>
      </div>


      {/* 🍎 Teachers Section - FIXED CARDS WITH INDIVIDUAL EDITING */}
      <div className="text-center mt-9 w-full">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <EditableText slug="kidzone_teachers_heading" defaultText="Our Teachers" />
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          {defaultTeachers.map((teacher, index) => (
            <div key={teacher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
              <div
                className="w-full h-[300px] cursor-pointer relative"
              >
                {/* Editable Image */}
                <EditableImage
                  slug={`kidzone_teacher_${index}_image`} // Unique slug for each teacher's image
                  defaultUrl={teacher.url}
                  defaultAlt={teacher.name}
                  onClick={handleImageClick}
                />
              </div>
              <div className="content px-4 pb-4 text-start">
                {/* Editable Name */}
                <h2 className='font-semibold text-xl'>
                  <EditableText slug={`kidzone_teacher_${index}_name`} defaultText={teacher.name} />
                </h2>
                {/* Editable Post */}
                <p className="mt-3">
                  <b>Post: </b>
                  <EditableText slug={`kidzone_teacher_${index}_post`} defaultText={teacher.post} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medias Section - NOW EDITABLE LIST (Unchanged) */}
      <div className="text-center mt-9 mb-10 w-full">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <EditableText slug="kidzone_gallery_heading" defaultText="Medias" />
        </h2>

        <div className='px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          <EditableImageList
            slug="kidzone_gallery" // For dynamic adding/deleting images
            defaultImages={defaultMedia}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Page