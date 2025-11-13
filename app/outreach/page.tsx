"use client";
import ImagePreview from "@/components/hooks/ImagePreview";
import Image from "next/image";
import React, { useState } from "react";

interface Teacher {
  name: string;
  post: string;
  image: string;
}

interface Media {
  id: number;
  image: string;
}

const page = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const kenyaTrip = [
    { id: 1, image: "/outreach/kenya.jpg", text: "first" },
    { id: 2, image: "/outreach/kenya2.jpg", text: "second" },
    { id: 3, image: "/outreach/kenya3.jpg", text: "third" },
  ];

  const outreaches = [
    { id: 1, image: "/outreach/outreach4.jpg", text: "first" },
    { id: 2, image: "/outreach/outreach5.jpg", text: "second" },
    { id: 3, image: "/outreach/outreach6.jpg", text: "third" },
  ];

  const streetEvang = [
    { id: 1, image: "/outreach/outreach.jpg", text: "first" },
    { id: 2, image: "/outreach/outreach2.jpg", text: "second" },
    { id: 3, image: "/outreach/street.jpg", text: "third" },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />

      {/* Header Image Section - Using Image for clarity */}
      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        <Image
          src="/outreach/smain.jpg"

          alt="Children Church"
          fill
          className="top-0 w-full h-full object-cover z-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Outreach
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          We are a Christ-centered, love-driven church, shining God's light
          through acts of compassion and shared responsibilty - within our
          church family, and across local and global communities. (Galatians
          6:10)
        </p>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Mission Trip To Kenya
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {kenyaTrip.map((kenya) => (
            <div
              key={kenya.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(kenya.image)}
            >
              <Image
                src={kenya.image}
                alt={kenya.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-9 text-start ">
          We give joyfull and sacrificially, stewarding God's blessings to
          advance His Kingdom. Our generosity mirrors His boundless grace,
          transforming lives and communities.
        </p>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Street Evangelism
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {streetEvang.map((street) => (
            <div
              key={street.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(street.image)}
            >
              <Image
                src={street.image}
                alt={street.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-9 text-start ">
          We serve selflessly, following Christ's example of humility. Through
          our gifts, time, and compassion, we meet needs and uplift others,
          glorifying God in every act of love. <br /> We are privileged to host
          a food pantry on the first Saturday of each month and Hallelujah Night
          for all children on the last day of October every year as a way to not
          only give back, but to give glory to God and make sure Jesus is
          revealed through acts of service.
        </p>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Food pantry
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {streetEvang.map((street) => (
            <div
              key={street.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(street.image)}
            >
              <Image
                src={street.image}
                alt={street.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-9 text-start ">
          Every summer, we host our annual church picnic at a local park in
          York, Pennsylvania. Itis a day filled with prayers, songs of praise,
          fun games, nutritious food, music and dance. We take one day out of
          the year to unwind and spend quality time with our church family as we
          anticipate what is expected towards the second hallf of the year. It
          will be an honor to have you join us at our next church picnic!
        </p>

        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Church Picnic
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative mt-7">
          {streetEvang.map((street) => (
            <div
              key={street.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(street.image)}
            >
              <Image
                src={street.image}
                alt={street.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-9 text-start ">
          Every year, RCCG York also hosts a marriage seminar for married
          couples, newly weds, and single adults who are hoping to get married.
          At this seminar, we equip you with
        </p>
        <ul className="text-start text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          <li className="ml-1">
            - Tools to align your marriage with Scripture's timeless truths.
          </li>
          <li className="ml-1">
            - Workshops on finances, intimacy, and parenting from a faith
            perspective.
          </li>
        </ul>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance text-start mt-1">
          It is also a great opportunity to connect with couples who celebrate
          victories and navigate challenges together, while raising families
          grounded in faith, love and godly values.
        </p>
      </div>
    </div>
  );
};

export default page;
