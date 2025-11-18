// page.tsx (Youth Three Sixteen Page)
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ImagePreview from '@/components/hooks/ImagePreview'

// 1. IMPORT EDITABLE COMPONENTS
import EditableText from '@/components/hooks/EditableText';
import EditableImage from '@/components/hooks/EditableImage';
import EditableImageList from '@/components/hooks/EditableImageList';


const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. CONSOLIDATED DEFAULT DATA
  const defaultTeachers = [
    { name: "Simisola Adebayo", post: "Youth Coordinator", image: "/youth/simi.jpg" },
    { name: "Ivie Edebiri", post: "Teacher", image: "/youth/ivie.jpg" },
    { name: "Olive Gray", post: "Teacher", image: "/youth/olive.jpg" },
    { name: "Arinola Ogunneye", post: "Teacher", image: "/youth/ogunneye.jpg" }
  ];

  const defaultMedias = [
    { url: "/youth/yimg.jpg", alt: "Youth event photo 1" },
    { url: "/youth/yimg2.jpg", alt: "Youth event photo 2" },
    { url: "/youth/nyimg3.jpg", alt: "Youth event photo 3" },
  ];

  const defaultYouthPastor = {
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

      {/* Header Image Section - NOW EDITABLE */}
      <div className=' h-[75vh] overflow-hidden relative w-screen'>
        <EditableImage
          slug="youth316_banner" // UNIQUE SLUG
          defaultUrl="/youth/youth-bg.png"
          defaultAlt="Youth Banner"
          priority
        />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full'>
        {/* Title 1 - NOW EDITABLE */}
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          <EditableText slug="youth316_title_welcome" defaultText="Welcome to Youth Three Sixteen" />
        </h1>

        {/* Paragraph 1 - NOW EDITABLE */}
        <p className=' text-gray-700 max-w-3xl mx-auto leading-relaxed text-center'>
          <EditableText slug="youth316_intro_p1" defaultText="Welcome to the Youth Church: Three Sixteen (3:16) Army!" />
        </p>

        {/* Youth Pastor Card Section - NOW EDITABLE */}
        <div className='flex justify-center items-center flex-col my-5 px-4'>
          <h2 className='text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6'>
            <EditableText slug="youth316_pastor_heading" defaultText="Our Pastor" />
          </h2>

          <div className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 w-full max-w-xs sm:max-w-sm md:max-w-md'>
            <div
              className='w-full h-[500px] relative cursor-pointer'
            >
              {/* Editable Image: Youth Pastor */}
              <EditableImage
                slug="youth316_pastor_image"
                defaultUrl={defaultYouthPastor.image}
                defaultAlt={defaultYouthPastor.name}
                onClick={handleImageClick}
              />
            </div>
            <div className="content px-4 pb-4 bg-white bg-opacity-50 text-start">
              {/* Editable Name */}
              <h1 className='font-semibold text-xl'>
                <EditableText slug="youth316_pastor_name" defaultText={defaultYouthPastor.name} />
              </h1>
              {/* Editable Post */}
              <p className="mt-3">
                <b>Post: </b>
                <EditableText slug="youth316_pastor_post" defaultText={defaultYouthPastor.post} />
              </p>
            </div>
          </div>
        </div>


        {/* Paragraph 2 - NOW EDITABLE */}
        <p className=' text-gray-700 max-w-3xl mx-auto leading-relaxed text-center'>
          <EditableText
            slug="youth316_intro_p2"
            defaultText="Aligned with RCCG's vision, we empower teens to live as bold, godly leaders. Through Scripture-based teachings, testimonies, and small groups, we tackle real-life challenges - peer pressure, identity, purpose - and discover biblical solutions. Our focus on prayer, accountability, and John 3:16 ('For God so love the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.') builds resilience and unwavering faith and love."
          />
        </p>


        {/* Teachers Section - NOW EDITABLE INDIVIDUAL CARDS */}
        <div className="text-center mt-9 w-full">
          <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <EditableText slug="youth316_teachers_heading" defaultText="Our Teachers" />
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            {defaultTeachers.map((teacher, index) => (
              <div key={teacher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
                <div
                  className="w-full h-[300px] cursor-pointer relative"
                >
                  {/* Editable Image: Teacher */}
                  <EditableImage
                    slug={`youth316_teacher_${index}_image`}
                    defaultUrl={teacher.image}
                    defaultAlt={teacher.name}
                    onClick={handleImageClick}
                  />
                </div>

                <div className="content px-4 pb-4 text-start">
                  {/* Editable Name */}
                  <h2 className='font-semibold text-xl'>
                    <EditableText slug={`youth316_teacher_${index}_name`} defaultText={teacher.name} />
                  </h2>
                  {/* Editable Post */}
                  <p className="mt-3">
                    <b>Post: </b>
                    <EditableText slug={`youth316_teacher_${index}_post`} defaultText={teacher.post} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medias Section - NOW EDITABLE GALLERY */}
        <div className="text-center mt-9 mb-10 w-full">
          <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <EditableText slug="youth316_gallery_heading" defaultText="Medias" />
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            {/* EditableImageList handles the mapping */}
            <EditableImageList
              slug="youth316_gallery" // UNIQUE SLUG
              defaultImages={defaultMedias}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page