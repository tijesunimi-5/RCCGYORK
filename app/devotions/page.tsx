import React from 'react';
import EditableText from '@/components/hooks/EditableText';

const DevotionalPage: React.FC = () => {
  return (
    // Set a minimum height and padding for the page content, accounting for a fixed header (pt-24)
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 font-inter">
      {/* Centered content wrapper with max-w for optimal reading experience on large screens */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Title: Uses responsive text sizing (4xl on mobile, 5xl on desktop) */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 pt-4 text-gray-900">
          <EditableText slug='devotional_head' defaultText='Daily Devotions' />
        </h1>

        {/* Topic/Subtitle: Clearly styled and centered */}
        <div className="text-xl sm:text-2xl font-bold my-4 text-center text-red-700">
          {/* Wrap EditableText content in a div to ensure block-level centering */}
          <EditableText slug='devotional_topic' defaultText='Finding Hope in Seasons of Depression' />
        </div>

        {/* Content Block: Card-like style for better separation and readability */}
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl text-gray-800">

          {/* Main Devotional Message Content Area */}
          <EditableText
            slug='devotional_message'
            // The className here applies to the outer <div> when in read-only (HTML) mode, 
            // ensuring consistent paragraph spacing for the devotional message.
            className="space-y-6 text-lg leading-relaxed"
            defaultText={`
              
                A teacher said to her students, "Boys and girls, there is a wonderful example in the life of the ant. Every day the ant goes to work and works all day. Every day the ant is busy. And in the end, what happens?"
              
                Little Johnny said, "Someone steps on Him."
              
            
              While this response might bring a smile, it serves as a powerful reminder: even our most diligent efforts need a higher purpose. When you feel overwhelmed or undervalued, remember that your worth is not defined by your productivity, but by the unfailing love of God. We are called to lean on His strength, especially in times of difficulty. May this devotion serve as a call to look up, trust in Him, and find rest in the unwavering promise of His presence.
              
            `}
          />

        </div>

        {/* Added a section for related scripture/call-to-action */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            <EditableText slug='devotional_footer_title' defaultText='Scripture for Reflection' />
          </h3>
          <div className="text-xl italic text-red-600">
            <EditableText slug='devotional_footer_verse' defaultText='“Come to me, all you who are weary and burdened, and I will give you rest.” — Matthew 11:28 (NIV)' />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DevotionalPage;