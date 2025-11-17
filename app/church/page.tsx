// app/church/page.tsx
'use client';

import React, { useState } from 'react';
import ImagePreview from '@/components/hooks/ImagePreview';
import EditableText from '@/components/hooks/EditableText';
import EditableImage from '@/components/hooks/EditableImage';
import EditableImageList from '@/components/hooks/EditableImageList';

export default function YasmPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const click = (url: string) => setSelected(url);
  const close = () => setSelected(null);

  return (
    <div className="w-full flex flex-col items-center justify-center mb-20">

      <ImagePreview imageUrl={selected} onClose={close} />

      {/* BANNER */}
      <div className="pt-20 h-[80vh] overflow-hidden relative w-screen">
        <EditableImage
          slug="yasm_banner"
          defaultUrl="/youth/yasm.png"
          defaultAlt="YASM Banner"
          onClick={click}
          priority
        />
      </div>

      {/* TITLE / INTRO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10">
          <EditableText slug="yasm_title" defaultText="Welcome to Young Adults & Singles Ministry" />
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-center">
          <EditableText slug="yasm_intro" defaultText="The Young Adults and Singles Ministry..." />
        </p>
      </div>

      {/* PRESIDENT */}
      <div className="flex justify-center items-center flex-col my-12 px-4 w-full">
        <h2 className="text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
          <EditableText slug="yasm_president_heading" defaultText="Our President" />
        </h2>

        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all max-w-md">
          <div className="w-full h-[500px] relative">
            <EditableImage
              slug="yasm_president"
              defaultUrl="/mCharles.jpg"
              defaultAlt="Mr Charles Kennedy"
              onClick={click}
              priority
            />
          </div>

          <div className="p-4 bg-white/50">
            <h1 className="font-semibold text-xl">
              <EditableText slug="yasm_president_name" defaultText="Mr Charles Kennedy" />
            </h1>
            <p className="mt-2">
              <b>Post: </b>
              <EditableText slug="yasm_president_post" defaultText="YASM President" />
            </p>
          </div>
        </div>
      </div>

      {/* CONTINUATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-center">
          <EditableText slug="yasm_continuation" defaultText="We are privileged to hold YASM services..." />
        </p>
      </div>

      {/* GALLERY */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <h2 className="text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center mb-6">
          <EditableText slug="yasm_media_header" defaultText="Medias" />
        </h2>

        <EditableImageList
          slug="yasm_medias"
          defaultImages={[
            { url: "/youth/yimg4.jpg", alt: "Youth Image 4" },
            { url: "/youth/yimg5.jpg", alt: "Youth Image 5" },
            { url: "/youth/yimg6.jpg", alt: "Youth Image 6" },
            { url: "/youth/yimg7.jpg", alt: "Youth Image 7" },
          ]}
          onImageClick={click}
        />
      </div>
    </div>
  );
}