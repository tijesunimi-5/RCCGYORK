// components/ImagePreview.tsx
'use client'
import React, { useEffect } from 'react';

// 1. Define the component's props interface
interface ImagePreviewProps {
  /** The URL of the image to display. Null hides the modal. */
  imageUrl: string | null;
  /** Function to call when the modal should close. */
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClose }) => {
  // Add keyboard support (closing with the Esc key)
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
  }, [imageUrl, onClose]); // Re-run effect when imageUrl or onClose changes

  if (!imageUrl) {
    return null;
  }

  return (
    // Backdrop: Fixed, full-screen, semi-transparent black.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose} // Close on backdrop click
    >
      {/* Modal Content container: Stop propagation so clicking the content doesn't close it */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 rounded-full bg-black bg-opacity-50"
          onClick={onClose}
          aria-label="Close image preview"
        >
          {/* Simple X icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        {/* Image Display */}
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImagePreview;