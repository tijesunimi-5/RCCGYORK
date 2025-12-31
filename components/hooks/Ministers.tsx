"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '../UI/Card'
import EditableText from '@/components/hooks/EditableText';
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
  post?: string;
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

  useEffect(() => {
    // 1. Animate Header
    const headerTarget: gsap.DOMTarget = '.js-ministers-header';
    gsap.set(headerTarget, { opacity: 0, y: 50 });
    gsap.to(headerTarget, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerTarget,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      }
    });

    // 2. Animate Cards
    const cardTargets: gsap.DOMTarget[] = gsap.utils.toArray('.js-minister-card');
    gsap.set(cardTargets, { opacity: 0, y: 100 });

    gsap.to(cardTargets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.js-minister-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      }
    });

  }, []);

  return (
    <div id='ministers' className='py-24 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden'>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='text-center mb-16 js-ministers-header'>
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <EditableText slug="ministers_section_title" defaultText="Our Ministers" />
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <EditableText slug="ministers_section_subtitle" defaultText="Get to meet our ministers." />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto js-minister-grid">
        {ministers.map((minister, index) => (
          <div
            key={minister.id}
            className='js-minister-card bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover:translate-y-2 transition-all border-0'
          >
            <div className='w-full h-[400px] relative'>
              <Image
                src={minister.image}
                alt={minister.name}
                fill
                className='object-cover'
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="content px-4 pb-4 text-start">
              <h2 className='font-semibold text-xl'>
                <EditableText slug={`minister_${index}_name`} defaultText={minister.name} />
              </h2>
              <div className='mt-3 flex gap-1'>
                <span className='font-bold'>Post:</span>
                <EditableText slug={`minister_${index}_post`} defaultText={minister.post || ""} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ministers;