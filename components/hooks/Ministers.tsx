"use client"
import React, { useEffect } from 'react'
import Image from 'next/image' // 1. Import Next.js Image Component
import { Card, CardContent, CardHeader, CardTitle } from '../UI/Card' // Assuming this path is correct
// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define the interface for Minister data
interface Minister {
  id: number;
  name: string;
  image: string;
  post?: string; // post is optional
}

const Ministers: React.FC = () => {
  const ministers: Minister[] = [
    {
      id: 1,
      name: "Pst. Olusola Osundeko & Pst. Teniola Osundeko",
      image: "/nsnr.jpg",
      post: "Senior Pastors"
    },
    {
      id: 2,
      name: "Pastor Kayode Adewumi",
      image: "/pkayode.jpg",
      post: "Resident Pastor"
    },
    {
      id: 3,
      name: "Pastor Olalekan Aderibigbe",
      image: "/plekan.jpg",
      post: "Assistant Pastor"
    },
    {
      id: 5,
      name: "Elder Quemiline Bull",
      image: "/elderque.jpg",
      post: "Elder"
    },
    {
      id: 6,
      name: "Deaconness Amma Nsiah",
      image: "/Deaconess.jpg",
      post: "Deaconess"
    },
    {
      id: 7,
      name: "Pastor Jumoke Obadofin-Thomas",
      image: "/pJum.jpg",
      post: "Assistant Pastor"
    },
  ]

  // Ministers.tsx - Updated useEffect block
  useEffect(() => {
    // === TypeScript-safe GSAP implementation ===

    // 1. Animate Header (standard slide up)
    const headerTarget: gsap.DOMTarget = '.js-ministers-header';
    gsap.set(headerTarget, { opacity: 0, y: 50 });
    gsap.to(headerTarget, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out', // Use a standard ease for a crisp finish
      scrollTrigger: {
        trigger: headerTarget,
        start: 'top 85%', // Start earlier
        toggleActions: 'play none none none', // Play once on scroll down
        once: true,
      }
    });

    // 2. Animate Cards (staggered slide up, playing once)
    const cardTargets: gsap.DOMTarget[] = gsap.utils.toArray('.js-minister-card');

    // Initial state setup
    gsap.set(cardTargets, { opacity: 0, y: 100 });

    // Animate the cards from their initial state to their final state
    gsap.to(cardTargets, {
      opacity: 1,
      y: 0,
      duration: 0.8, // Faster duration
      stagger: 0.15, // Slightly larger stagger for visibility
      ease: 'back.out(1.2)', // A nice punchy ease
      scrollTrigger: {
        trigger: '.js-minister-grid', // Use the grid wrapper as the main trigger
        start: 'top 80%', // Start when the top of the grid enters view
        toggleActions: 'play none none none', // Play once on scroll down
        once: true,
      }
    });

  }, []);

  return (
    <div id='ministers' className='py-24 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden'> {/* Adjusted padding to py-24 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* === Header - Added class: js-ministers-header === */}
        <div className='text-center mb-16 js-ministers-header'>
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our Ministers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get to meet our ministers.
          </p>
        </div>
      </div>

      {/* === Card Grid - Added class: js-minister-grid for trigger === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto js-minister-grid">
        {ministers.map((minister) => (
          // === Card Item - Added class: js-minister-card ===
          <div
            key={minister.id}
            className='js-minister-card bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'
          >
            {/* 2. Parent Container Setup: Must be relative and have dimensions */}
            <div className='w-full h-[400px] relative'>
              {/* 3. Replace <img> with Image component, using fill and object-cover */}
              <Image
                src={minister.image}
                alt={minister.name}
                fill // Fills the parent div
                className='object-cover' // Ensures the image fits perfectly without distortion
                sizes="(max-width: 768px) 50vw, 25vw" // Optimizes image delivery
              />
            </div>
            <div className="content px-4 pb-4 text-start"> {/* Adjusted padding */}
              <h2 className='font-semibold text-xl'>{minister.name}</h2>
              {minister.post && (
                <p className='mt-3'>Post: {minister.post}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ministers