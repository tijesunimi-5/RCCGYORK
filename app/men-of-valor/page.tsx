// page.tsx (Men of Valor Page)
'use client'
import ImagePreview from "@/components/hooks/ImagePreview";
import Image from "next/image";
import React, { useState } from "react";

// 1. IMPORT EDITABLE COMPONENTS
import EditableText from '@/components/hooks/EditableText';
import EditableImage from '@/components/hooks/EditableImage';
import EditableImageList from '@/components/hooks/EditableImageList';

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Default data for the Men's Head section
  const defaultMenHead = {
    id: 1,
    image: "/ushers/dol.jpg",
    name: "Jean Dol",
    post: "President, RCCG YORK Men of Valor"
  };

  // Default data for the Gallery
  const defaultMenPic = [
    { url: "/men/men2.jpg", alt: "Men of Valor fellowship" },
    { url: "/men/men3.jpg", alt: "Men's outreach event" },
    { url: "/men/men.jpg", alt: "Group photo of Men of Valor" }
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />

      {/* Header Image Section - NOW EDITABLE */}
      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        <EditableImage
          slug="men_banner" // UNIQUE SLUG
          defaultUrl="/men/mmain.jpg"
          defaultAlt="Men of Valor Ministry Banner"
          priority
          onClick={handleImageClick}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center">
        {/* Title - NOW EDITABLE */}
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          <EditableText slug="men_title" defaultText="Step into Men of Valor" />
        </h1>

        {/* Intro Paragraph 1 - NOW EDITABLE */}
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          <EditableText
            slug="men_intro_p1"
            defaultText="The Men's Ministry at RCCG Living Spring York is a place where men and young men unite to grow in faith, leadership, and service."
          />
        </p>

        {/* Men's Head Section - CONVERTED TO STATIC EDITABLE IMAGE/TEXT */}
        {/* We use the single defaultMenHead item since the list is static (no add/delete) */}
        <div key={defaultMenHead.id} className='bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 w-full max-w-xs sm:max-w-sm md:max-w-md my-10 '>
          <div
            className='w-full h-[500px] cursor-pointer relative'
          // We wrap EditableImage in its own container to maintain layout
          >
            <EditableImage
              slug="men_president_image" // UNIQUE SLUG
              defaultUrl={defaultMenHead.image}
              defaultAlt={defaultMenHead.name}
              onClick={handleImageClick}
            />
          </div>
          <div className="content px-4 pb-4 bg-white bg-opacity-50 text-start">
            {/* Name - NOW EDITABLE */}
            <h1 className='font-semibold text-xl'>
              <EditableText slug="men_president_name" defaultText={defaultMenHead.name} />
            </h1>
            {/* Post - NOW EDITABLE */}
            <p className="mt-3">
              <b>Post: </b>
              <EditableText slug="men_president_post" defaultText={defaultMenHead.post} />
            </p>
          </div>
        </div>


        {/* Intro Paragraph 2 - NOW EDITABLE */}
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          <EditableText
            slug="men_intro_p2"
            defaultText="We are a brotherhood committed to fostering spiritual development, authentic fellowship, and impactful outreach, empowering men to lead boldly in their homes, church, and communities. Through mentorship, discipleship, and action, we strive to raise godly men who reflect Christ's strength and integrity in every sphere of life."
          />
        </p>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        {/* Gallery Title - NOW EDITABLE */}
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <EditableText slug="men_gallery_title" defaultText="Gallery" />
        </h2>

        {/* Gallery Section - NOW EDITABLE LIST */}
        <div className="max-w-7xl mx-auto relative">
          <EditableImageList
            slug="men_gallery" // UNIQUE SLUG
            defaultImages={defaultMenPic}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
};

export default page;