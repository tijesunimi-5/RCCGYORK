// page.tsx (Protocol and Media Team Page)
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ImagePreview from '@/components/hooks/ImagePreview'

// 1. IMPORT EDITABLE COMPONENTS
import EditableText from '@/components/hooks/EditableText';
import EditableImage from '@/components/hooks/EditableImage';
import EditableImageList from '@/components/hooks/EditableImageList'; // Kept for general gallery use if structure changes

const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. CONSOLIDATED DEFAULT DATA (Cleaned up from the complex alt string)
  const defaultUshers = [
    { url: "/ushers/usher.jpg", name: "Mr. Sekou Kromah", post: "Head of ushering department" },
    { url: "/ushers/usher2.jpg", name: "Mrs. Belinda Nebedum", post: "Usher" },
    { url: "/ushers/usher3.jpg", name: "Mrs. Kehinde Kalejaiye", post: "Usher" },
    { url: "/ushers/usher4.jpg", name: "Mr. Idahosa Prince", post: "Usher" },
    { url: "/ushers/utom.jpg", name: "Mrs. Oluwatomiwa Adewumi", post: "Usher" },
    { url: "/ushers/dol.jpg", name: "Mr. Jean Dol", post: "Usher" },
  ];

  const defaultMedias = [
    { url: "/ushers/joyce.jpg", name: "Mrs. Joyce Bull", post: "Media and Photography" },
    { url: "/ushers/jean.jpg", name: "Mrs. Guirlene Jean Charles", post: "Media and Photography" },
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full flex flex-col items-center mb-20'>
      <ImagePreview
        imageUrl={selectedImage}
        onClose={handleClosePreview}
      />

      <div className="text-center pt-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Protocol Team Title - NOW EDITABLE */}
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-10">
          <EditableText slug="protocol_title" defaultText="Protocol Team" />
        </h2>

        {/* Ushers Section - FIXED CARDS WITH INDIVIDUAL EDITING */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          {defaultUshers.map((usher, index) => (
            <div key={index} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
              <div
                className="w-full h-[300px] cursor-pointer relative"
              >
                {/* Editable Image */}
                <EditableImage
                  slug={`protocol_usher_${index}_image`}
                  defaultUrl={usher.url}
                  defaultAlt={usher.name}
                  onClick={handleImageClick}
                />
              </div>
              <div className="content px-4 pb-4 text-start">
                {/* Editable Name */}
                <h2 className='font-semibold text-xl'>
                  <EditableText slug={`protocol_usher_${index}_name`} defaultText={usher.name} />
                </h2>
                {/* Editable Post */}
                <p className="mt-3">
                  <b>Post: </b>
                  <EditableText slug={`protocol_usher_${index}_post`} defaultText={usher.post} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Media Team Title - NOW EDITABLE */}
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-10">
          <EditableText slug="media_team_title" defaultText="Media Team" />
        </h2>

        {/* Media Team Section - FIXED CARDS WITH INDIVIDUAL EDITING */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          {defaultMedias.map((media, index) => (
            <div key={index} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'>
              <div
                className="w-full h-[300px] cursor-pointer relative"
                onClick={() => handleImageClick(media.url)}
              >
                {/* Editable Image */}
                <EditableImage
                  slug={`protocol_media_${index}_image`}
                  defaultUrl={media.url}
                  defaultAlt={media.name}
                  onClick={handleImageClick}
                />
              </div>
              <div className="content px-4 pb-4 text-start">
                {/* Editable Name */}
                <h2 className='font-semibold text-xl'>
                  <EditableText slug={`protocol_media_${index}_name`} defaultText={media.name} />
                </h2>
                {/* Editable Post */}
                <p className="mt-3">
                  <b>Post: </b> <EditableText slug={`protocol_media_${index}_post`} defaultText={media.post} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page