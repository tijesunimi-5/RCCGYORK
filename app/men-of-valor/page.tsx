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
  const menPic = [{ id: 1, image: "/men/men2.jpg", text: "first image" }];

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />
      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        <Image
          src="/men/mmain.jpg"

          alt="Children Church"
          fill
          className="top-0 w-full h-full object-cover z-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Step into Men of Valor
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          The Men's Ministry at RCCG Living Spring York is a place where men and
          young men unite to grow in faith, leadership, and service. We are a
          brotherhood committed to fostering spiritual development, authentic
          fellowship, and impactful outreach, empowering men to lead boldly in
          their homes, church, and communities. Through mentorship,
          discipleship, and action, we strive to raise godly men who reflect
          Christ's strength and integrity in every sphere of life.
        </p>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {menPic.map((men) => (
            <div
              key={men.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(men.image)}
            >
              <Image
                src={men.image}
                alt={men.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
