"use client";
import ImagePreview from "@/components/hooks/ImagePreview";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const womenPic= [
    {id: 1, image: "/wov/wov.jpg", text: "first"},
    {id: 2, image: "/wov/wov2.jpg", text: "second"},
    {id: 3, image: "/wov/wov3.jpg", text: "third"},
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />

      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        {/* Swapped <img> for Next.js Image with fill prop */}
        <Image
          src="/youth/yasm.png"
          alt="Youth Adults & Single Ministry"
          fill
          className="top-0 w-full h-full object-cover z-20"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* ... (Text content remains the same) ... */}
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Welcome to Women of Virtue
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance text-start">
          The Women's Ministry at RCCG Living Spring York is a place where women
          of all ages and walks of life unite to glorify God through prayer,
          worship, and transformative Scripture study. We are vibrant sisterhood
          dedicated to deepening your realtionship with Jesus Christ, empowering
          you to fulfill His unique purpose for your life, family, church, and
          community. Whether you're seeking spiritual growth, authentic
          fellowship, or tools to thrive in your God-given roles, Women of
          Virtue equips you to walk in grace, strength, and divine wisdom.
        </p>

        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          A Sisterhood For Every Season
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance text-start">
          No matter your age, background, or life stage, Women of Virtue
          embraces you with grace and acceptance. Guided by the Holy Spirit, we
          create a safe, nurturing space to heal, grow, and celebrate God's
          faithfulness. Our ministry meets you where you are, helping you
          discover His plan while fostering lifelong friendships rooted in
          Christ's love.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <h2 className="text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center mb-6">
          Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {womenPic.map((women) => (
            <div
              key={women.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative" // Added relative
              onClick={() => handleImageClick(women.image)} // Click handler on the container
            >
              {/* Swapped <img> for Next.js Image with fill prop */}
              <Image
                src={women.image}
                alt={`Media ${women.id}`}
                fill
                className="object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
