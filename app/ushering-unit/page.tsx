// page.tsx (Protocol and Media Team Page)
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ImagePreview from '@/components/hooks/ImagePreview'

// 1. IMPORT EDITABLE COMPONENTS (Added missing import)
import EditableText from '@/components/hooks/EditableText';
import EditableImage from '@/components/hooks/EditableImage';
import EditableImageList from '@/components/hooks/EditableImageList'; // <--- ADDED

const Page: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 2. CONSOLIDATED DEFAULT DATA (Simplified for EditableImageList)
  // NOTE: Alt text will temporarily hold the name and post information for display
  const defaultUshers = [
    { url: "/ushers/usher.jpg", alt: "Mr. Sekou Kromah (Head of ushering department)" },
    { url: "/ushers/usher2.jpg", alt: "Mrs. Belinda Nebedum (Usher)" },
    { url: "/ushers/usher3.jpg", alt: "Mrs. Kehinde Kalejaiye (Usher)" },
    { url: "/ushers/usher4.jpg", alt: "Mr. Idahosa Prince (Usher)" },
    { url: "/ushers/utom.jpg", alt: "Mrs. Oluwatomiwa Adewumi (Usher)" },
    { url: "/ushers/dol.jpg", alt: "Mr. Jean Dol (Usher)" },
  ];

  const defaultMedias = [
    { url: "/ushers/joyce.jpg", alt: "Mrs. Joyce Bull (Media and Photography)" },
    { url: "/ushers/jean.jpg", alt: "Mrs. Guirlene Jean Charles (Media and Photography)" },
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
        {/* Protocol Team Title */}
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-10">
          <EditableText slug="protocol_title" defaultText="Protocol Team" />
        </h2>

        {/* Ushers Section - NOW DYNAMICALLY EDITABLE LIST */}
        <div className='max-w-7xl mx-auto'>
          <EditableImageList
            slug="protocol_ushers" // UNIQUE SLUG for list persistence
            defaultImages={defaultUshers.map(u => ({ url: u.url, alt: u.alt }))} // Pass only URL/Alt
            onImageClick={handleImageClick}
          />
        </div>


        {/* Media Team Title */}
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-10">
          <EditableText slug="media_team_title" defaultText="Media Team" />
        </h2>

        {/* Media Team Section - NOW DYNAMICALLY EDITABLE LIST */}
        <div className='max-w-7xl mx-auto'>
          <EditableImageList
            slug="protocol_media" // UNIQUE SLUG for list persistence
            defaultImages={defaultMedias.map(m => ({ url: m.url, alt: m.alt }))} // Pass only URL/Alt
            onImageClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Page