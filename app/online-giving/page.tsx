"use client";
import React from 'react';

// NOTE: Since this environment cannot resolve absolute paths (@/...), 
// we must use mock components to ensure the file is runnable.
// In your local project, replace these mocks with the actual imports.

// Mocks for react-icons/fa
const FaHeart = ({ className }: { className: string }) => <div className={className}>❤️</div>;
const FaMobileAlt = ({ className }: { className: string }) => <div className={className}>📱</div>;
const FaCreditCard = ({ className }: { className: string }) => <div className={className}>💳</div>;
import EditableText from '@/components/hooks/EditableText';

// Mock for EditableText component
interface EditableTextProps {
  slug: string;
  defaultText: string;
}



const DonationPage: React.FC = () => {
  return (
    // Responsive container setup: min-h-screen for full view, pt-24 for fixed header, bg-gray-50 for clean contrast
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 font-inter">

      {/* Centered content wrapper, max-width for readability */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center pt-8 pb-12">
          <FaHeart className="w-12 h-12 mx-auto text-red-700 mb-4 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-700">
            <EditableText slug='donation_head' defaultText='Give to support our mission' />
          </h1>

          {/* Main Mission Message - Styled for readability */}
          <div className="mt-5 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <EditableText
              slug='donation_message'
              defaultText="Your decision to give is more than just a donation; it's a vital investment in the mission and future of our church and community. Every gift directly fuels our ability to support essential outreach programs, maintain resources for spiritual growth, and sustain our worship services. By choosing to partner with us financially, you are actively participating in the work of spreading hope and making a tangible, positive difference right here in York, PA, and beyond. We are deeply grateful for your faithfulness and commitment to this shared purpose."
            />
          </div>
        </div>

        {/* Giving Methods Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {/* Column 1: Text Giving / Digital Apps */}
          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-700 flex flex-col items-center">
            <FaMobileAlt className="w-8 h-8 text-red-700 mb-4" />
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick & Mobile Giving</h2>

            <div className='w-full space-y-6 text-center'>

              {/* Text Giving Method */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className='text-base text-gray-600 font-medium mb-1'>Text Giving</p>
                <h1 className='text-2xl font-extrabold text-gray-900'>
                  <EditableText slug='donation_give1' defaultText='Text GIVE to 717-862-7372' />
                </h1>
              </div>

              {/* Zelle Method */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className='text-base text-gray-600 font-medium mb-1'>Zelle (via phone number)</p>
                <h1 className='text-2xl font-extrabold text-gray-900'>
                  <EditableText slug='donation_give2' defaultText='717-919-3033' />
                </h1>
              </div>

              {/* CashApp Method */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className='text-base text-gray-600 font-medium mb-1'>CashApp</p>
                <p className='text-2xl font-extrabold text-gray-900'>
                  <a
                    href="https://cash.app/$rccgyork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-green-700 hover:text-green-800 transition-colors'
                  >
                    $rccgyork
                  </a>
                </p>
              </div>

              {/* CashApp QR Code (made responsive and centered) */}
              <div className="mt-8">
                <img
                  src="/cashapp.jpg"
                  alt="CashApp QR Code for $rccgyork"
                  className='mx-auto rounded-lg max-w-[200px] w-full shadow-md'
                  // FIX: Changed onError to an anonymous function to prevent serialization issues
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    (e.currentTarget as HTMLImageElement).onerror = null;
                    (e.currentTarget as HTMLImageElement).src = "https://placehold.co/200x200/50C878/ffffff?text=CashApp+QR";
                  }}
                />
              </div>

            </div>
          </div>

          {/* Column 2: Online Giving Portal / In Person (Placeholder) */}
          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-700 flex flex-col">
            <FaCreditCard className="w-8 h-8 text-blue-700 mb-4 self-center" />
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Online & In-Person</h2>

            <div className="space-y-6 text-center">

              {/* Primary Online Giving CTA (Placeholder) */}
              <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl cursor-pointer">
                Give via Secure Online Portal (Recommended)
              </div>

              {/* Mail-In Option */}
              <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-left">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Give by Mail</h3>
                <p className="text-gray-600">
                  You can mail your checks (payable to RCCG York) to our church address:
                  <br /><strong className="text-gray-900">1550 Eleventh Ave, York, PA 17402</strong>
                </p>
              </div>

              {/* In-Person Option */}
              <div className="p-4 bg-gray-100 rounded-lg border border-gray-200 text-left">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">In-Person Offering</h3>
                <p className="text-gray-600">
                  You are welcome to give during our service times on Sunday, or visit the office during <a href="#contact" className="text-red-700 underline">office hours</a>.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DonationPage;