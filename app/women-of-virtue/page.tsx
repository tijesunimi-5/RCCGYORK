// page.tsx (Women of Virtue Page)
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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  // 2. CONSOLIDATED DEFAULT DATA
  const defaultWomenPic = [
    { url: "/wov/wov.jpg", alt: "Women of Virtue event photo 1" },
    { url: "/wov/wov2.jpg", alt: "Women of Virtue event photo 2" },
    { url: "/wov/wov3.jpg", alt: "Women of Virtue event photo 3" },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />

      {/* Header Image Section - NOW EDITABLE */}
      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        <EditableImage
          slug="wov_banner" // UNIQUE SLUG
          defaultUrl="/youth/yasm.png" // Using yasm image as default based on original code
          defaultAlt="Women of Virtue Banner"
          priority
        />
      </div>

      {/* Background Effects (Static, no editing needed here) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Title 1 - NOW EDITABLE */}
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          <EditableText slug="wov_title_welcome" defaultText="Welcome to Women of Virtue" />
        </h1>

        {/* Paragraph 1 - NOW EDITABLE */}
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance text-start">
          <EditableText
            slug="wov_intro_p1"
            defaultText="The Women's Ministry at RCCG Living Spring York is a place where women of all ages and walks of life unite to glorify God through prayer, worship, and transformative Scripture study. We are vibrant sisterhood dedicated to deepening your realtionship with Jesus Christ, empowering you to fulfill His unique purpose for your life, family, church, and community. Whether you're seeking spiritual growth, authentic fellowship, or tools to thrive in your God-given roles, Women of Virtue equips you to walk in grace, strength, and divine wisdom."
          />
        </p>

        {/* Title 2 - NOW EDITABLE */}
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          <EditableText slug="wov_title_sisterhood" defaultText="A Sisterhood For Every Season" />
        </h1>

        {/* Paragraph 2 - NOW EDITABLE */}
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance text-start">
          <EditableText
            slug="wov_intro_p2"
            defaultText="No matter your age, background, or life stage, Women of Virtue embraces you with grace and acceptance. Guided by the Holy Spirit, we create a safe, nurturing space to heal, grow, and celebrate God's faithfulness. Our ministry meets you where you are, helping you discover His plan while fostering lifelong friendships rooted in Christ's love."
          />
        </p>
      </div>

      {/* Gallery Section - NOW EDITABLE */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <h2 className="text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center mb-6">
          <EditableText slug="wov_gallery_title" defaultText="Gallery" />
        </h2>

        {/* Replaced womenPic.map with EditableImageList */}
        <EditableImageList
          slug="wov_gallery" // UNIQUE SLUG
          defaultImages={defaultWomenPic}
          onImageClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default page;