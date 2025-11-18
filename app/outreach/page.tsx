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

  const picnic = [
    { id: 1, image: "/outreach/picnic/picnic.jpg", text: "first" },
    { id: 2, image: "/outreach/picnic/picnic2.jpg", text: "second" },
    { id: 3, image: "/outreach/picnic/picnic3.jpg", text: "third" },
    { id: 4, image: "/outreach/picnic/picnic4.jpg", text: "fourth" },
  ];

  const hallenight = [
    { id: 1, image: "/outreach/hallenight/halle.jpg", text: "first" },
    { id: 2, image: "/outreach/hallenight/halle2.jpg", text: "second" },
    { id: 3, image: "/outreach/hallenight/halle3.jpg", text: "third" },
    { id: 4, image: "/outreach/hallenight/halle4.jpg", text: "fourth" },
    { id: 5, image: "/outreach/hallenight/halle5.jpg", text: "fifth" },
    { id: 6, image: "/outreach/hallenight/halle6.jpg", text: "sixth" },
  ]

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
          Mission Trip to Kenya
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          We are a Christ-centered, love-driven church, shining God's light
          through acts of compassion and shared responsibilty - within our
          church family, and across local and global communities. (Galatians
          6:10)
        </p>

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
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Street Evangelism
        </h2>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          We give joyfull and sacrificially, stewarding God's blessings to
          advance His Kingdom. Our generosity mirrors His boundless grace,
          transforming lives and communities.
        </p>


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

      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          Church Pinic
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          Every summer, we host our annual church picnic at a local park in
          York, Pennsylvania. It is a day filled with prayers, songs of praise,
          fun games, nutritious food, music and dance. We take one day out of
          the year to unwind and spend quality time with our church family as we
          anticipate what is expected towards the second hallf of the year. It
          will be an honor to have you join us at our next church picnic!
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {picnic.map((pic) => (
            <div
              key={pic.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(pic.image)}
            >
              <Image
                src={pic.image}
                alt={pic.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-5">
          Food pantry
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          We serve selflessly, following Christ's example of humility. Through
          our gifts, time, and compassion, we meet needs and uplift others,
          glorifying God in every act of love. <br /> We are privileged to host
          a food pantry on the last Saturday of each month. Stop by and pick up your grocery needs as we cater to you and others in need.
        </p>

        <div className="flex justify-center items-center mx-5 relative">
          <img src={"/outreach/pantry.jpg"} alt="food pantry" className="w-[500px] rounded-md shadow-lg" />
        </div>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-5">
          Hallelujah Night
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          RCCG York hosts Hallelujah Night for all children on the last day of October every year as a way to not only give back, but to give glory to God and make sure Jesus is revealed through fun games, activities and Bible knowledge. The goal is for children to get accustomed to spending the last day of the month of Octobe in the presence of God, rather than the secular alternative.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          {hallenight.map((halle) => (
            <div
              key={halle.id}
              className="bg-card text-card-foreground flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0 aspect-square relative"
              onClick={() => handleImageClick(halle.image)}
            >
              <Image
                src={halle.image}
                alt={halle.text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-5">
          Marriage Seminar
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start ">
          Every year, RCCG York also hosts a marriage seminar for married couples, newly weds, and single adults who are hoping to get married. At this seminar, we equip you with
        </p>
        <ul className="text-start list-disc ml-4 mb-1 text-gray-700">
          <li>Tools to align your marriage with Scripture's timeless truths.</li>
          <li>Workshops on finances, intimacy, and parenting from a faith perspective.</li>
        </ul>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-1 text-start mb-8">
          It is also a great opportunity to connect with couples who celebrate victories and navigate challenges together, while raising families grounded in faith, love and godly values.
        </p>

        <div className="flex justify-center items-center mx-5 relative">
          <img src={"/outreach/marriage.jpg"} alt="food pantry" className="w-[500px] rounded-md shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default page;
