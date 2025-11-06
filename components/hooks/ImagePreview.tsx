// components/hooks/ImagePreview.tsx
'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'; // IMPORT NEXT.JS IMAGE

// Define the component's props interface
interface ImagePreviewProps {
  /** The URL of the image to display. Null hides the modal. */
  imageUrl: string | null;
  /** Function to call when the modal should close. */
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClose }) => {
  // ... (useEffect for Esc key remains the same) ...
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (imageUrl) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [imageUrl, onClose]);

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Content container: must be relative and define size for Image fill */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] p-4"
        style={{ width: '90vw', height: '90vh' }} // Explicitly define size
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button remains the same */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 rounded-full bg-black bg-opacity-50"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        {/* Swapped <img> for Next.js Image with fill prop */}
        <Image
          src={imageUrl}
          alt="Preview"
          fill // Fills the defined 90vw/90vh parent container
          className="object-contain shadow-2xl rounded-lg" // object-contain is crucial for preview
          sizes="90vw" // Helps Next.js optimize the preview image size
        />
      </div>
    </div>
  );
};

export default ImagePreview;