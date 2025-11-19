'use client'
import ImagePreview from "@/components/hooks/ImagePreview";
import Image from "next/image";
import React, { useState } from "react";

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

  const defaultKenyaTrip = [
    { url: "/outreach/kenya.jpg", alt: "Kenya mission trip photo 1" },
    { url: "/outreach/kenya2.jpg", alt: "Kenya mission trip photo 2" },
    { url: "/outreach/kenya3.jpg", alt: "Kenya mission trip photo 3" },
  ];

  const defaultStreetEvang = [
    { url: "/outreach/outreach.jpg", alt: "Street Evangelism photo 1" },
    { url: "/outreach/outreach2.jpg", alt: "Street Evangelism photo 2" },
    { url: "/outreach/street.jpg", alt: "Street Evangelism photo 3" },
  ];

  const defaultPicnic = [
    { url: "/outreach/picnic/picnic.jpg", alt: "Church Picnic photo 1" },
    { url: "/outreach/picnic/picnic2.jpg", alt: "Church Picnic photo 2" },
    { url: "/outreach/picnic/picnic3.jpg", alt: "Church Picnic photo 3" },
    { url: "/outreach/picnic/picnic4.jpg", alt: "Church Picnic photo 4" },
  ];

  const defaultHallenight = [
    { url: "/outreach/Hallenight/halle.jpg", alt: "Hallelujah Night photo 1" },
    { url: "/outreach/Hallenight/halle2.jpg", alt: "Hallelujah Night photo 2" },
    { url: "/outreach/Hallenight/halle3.jpg", alt: "Hallelujah Night photo 3" },
    { url: "/outreach/Hallenight/halle4.jpg", alt: "Hallelujah Night photo 4" },
    { url: "/outreach/Hallenight/halle5.jpg", alt: "Hallelujah Night photo 5" },
    { url: "/outreach/Hallenight/halle6.jpg", alt: "Hallelujah Night photo 6" },
  ]
  // Removed unused 'Teacher', 'Media', 'outreaches' arrays to clean up

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">
      <ImagePreview imageUrl={selectedImage} onClose={handleClosePreview} />

      {/* Header Image Section - NOW EDITABLE */}
      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        <EditableImage
          slug="outreach_banner" // UNIQUE SLUG
          defaultUrl="/outreach/smain.jpg"
          defaultAlt="Outreach & Missions Banner"
          
          priority
        />
      </div>

      {/* === Mission Trip to Kenya Section === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          <EditableText slug="outreach_kenya_title" defaultText="Mission Trip to Kenya" />
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance">
          <EditableText
            slug="outreach_kenya_intro"
            defaultText="We are a Christ-centered, love-driven church, shining God's light through acts of compassion and shared responsibilty - within our church family, and across local and global communities. (Galatians 6:10)"
          />
        </p>

        {/* Kenya Trip Gallery - NOW EDITABLE */}
        <div className="relative">
          <EditableImageList
            slug="outreach_kenya_gallery" // UNIQUE SLUG
            defaultImages={defaultKenyaTrip}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      {/* === Street Evangelism Section === */}
      <div className="text-center mt-9 w-full relative px-4">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <EditableText slug="outreach_street_evang_title" defaultText="Street Evangelism" />
        </h2>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          <EditableText
            slug="outreach_street_evang_content"
            defaultText="We give joyfull and sacrificially, stewarding God's blessings to advance His Kingdom. Our generosity mirrors His boundless grace, transforming lives and communities."
          />
        </p>

        {/* Street Evangelism Gallery - NOW EDITABLE */}
        <div className="max-w-7xl mx-auto relative">
          <EditableImageList
            slug="outreach_street_evang_gallery" // UNIQUE SLUG
            defaultImages={defaultStreetEvang}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      {/* === Church Picnic Section === */}
      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          <EditableText slug="outreach_picnic_title" defaultText="Church Picnic" />
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          <EditableText
            slug="outreach_picnic_content"
            defaultText="Every summer, we host our annual church picnic at a local park in York, Pennsylvania. It is a day filled with prayers, songs of praise, fun games, nutritious food, music and dance. We take one day out of the year to unwind and spend quality time with our church family as we anticipate what is expected towards the second hallf of the year. It will be an honor to have you join us at our next church picnic!"
          />
        </p>

        {/* Picnic Gallery - NOW EDITABLE */}
        <div className="max-w-7xl mx-auto relative">
          <EditableImageList
            slug="outreach_picnic_gallery" // UNIQUE SLUG
            defaultImages={defaultPicnic}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      {/* === Food Pantry Section === */}
      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-5">
          <EditableText slug="outreach_pantry_title" defaultText="Food pantry" />
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          <EditableText
            slug="outreach_pantry_content"
            defaultText="We serve selflessly, following Christ's example of humility. Through our gifts, time, and compassion, we meet needs and uplift others, glorifying God in every act of love. We are privileged to host a food pantry on the last Saturday of each month. Stop by and pick up your grocery needs as we cater to you and others in need."
          />
        </p>

        {/* Food Pantry Single Image - NOW EDITABLE */}
        <div className="flex justify-center items-center mx-5 relative">
          <div className="w-[500px] h-72 relative"> {/* Added container for fill property */}
            <EditableImage
              slug="outreach_pantry_image" // UNIQUE SLUG
              defaultUrl="/outreach/pantry.jpg"
              defaultAlt="Food Pantry service"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>

      {/* === Hallelujah Night Section === */}
      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-5">
          <EditableText slug="outreach_halle_title" defaultText="Hallelujah Night" />
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start mb-4">
          <EditableText
            slug="outreach_halle_content"
            defaultText="RCCG York hosts Hallelujah Night for all children on the last day of October every year as a way to not only give back, but to give glory to God and make sure Jesus is revealed through fun games, activities and Bible knowledge. The goal is for children to get accustomed to spending the last day of the month of Octobe in the presence of God, rather than the secular alternative."
          />
        </p>

        {/* Hallelujah Night Gallery - NOW EDITABLE */}
        <div className="max-w-7xl mx-auto relative">
          <EditableImageList
            slug="outreach_halle_gallery" // UNIQUE SLUG
            defaultImages={defaultHallenight}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      {/* === Marriage Seminar Section === */}
      <div className="text-center mt-9 w-full relative px-4">
        <h1 className="text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-5">
          <EditableText slug="outreach_marriage_title" defaultText="Marriage Seminar" />
        </h1>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-5 text-start ">
          <EditableText
            slug="outreach_marriage_intro"
            defaultText="Every year, RCCG York also hosts a marriage seminar for married couples, newly weds, and single adults who are hoping to get married. At this seminar, we equip you with"
          />
        </p>

        {/* List items are combined into a single editable block for simplicity */}
        <ul className="text-start list-disc ml-4 mb-1 text-gray-700">
          <li>
            <EditableText slug="outreach_marriage_list1" defaultText="Tools to align your marriage with Scripture's timeless truths." />
          </li>
          <li>
            <EditableText slug="outreach_marriage_list2" defaultText="Workshops on finances, intimacy, and parenting from a faith perspective." />
          </li>
        </ul>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-balance mt-1 text-start mb-8">
          <EditableText
            slug="outreach_marriage_conclusion"
            defaultText="It is also a great opportunity to connect with couples who celebrate victories and navigate challenges together, while raising families grounded in faith, love and godly values."
          />
        </p>

        {/* Marriage Seminar Single Image - NOW EDITABLE */}
        <div className="flex justify-center items-center mx-5 relative">
          <div className="w-[500px] h-72 relative"> {/* Added container for fill property */}
            <EditableImage
              slug="outreach_marriage_image" // UNIQUE SLUG
              defaultUrl="/outreach/marriage.jpg"
              defaultAlt="Marriage Seminar attendees"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;