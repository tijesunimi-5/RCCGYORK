"use client"
import React from 'react'
import { FaArrowRight, FaCalendar, FaClock, FaMapPin, FaVideo } from "react-icons/fa";
import { Button } from "../UI/Button";

export function Hero() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image with Navy Blue/Indigo Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* UPDATED: Deep Indigo/Navy Blue Overlay (Calming) */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-950/80 via-indigo-900/80 to-black/80" />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-20">
        {/* Main Heading */}
        <div className="mb-8">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <div className="flex h-3 w-3">
                {/* UPDATED: Amber ping/glow for warm accent */}
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </div>
              <span className="text-sm">Welcome to Living Spring</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
            RCCG<br />
            {/* UPDATED: Text gradient to amber/gold */}
            <span className="bg-linear-to-r from-amber-300 via-amber-200 to-white bg-clip-text text-transparent">
              Living Spring
            </span>
          </h1>
        </div>

        <p className="text-2xl md:text-3xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Church on a mission. People with a purpose
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            // UPDATED: Primary button to rich amber/gold
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-2xl hover:shadow-xl transition-all hover:scale-105 group text-lg px-8 py-6"
            onClick={() => handleNavClick('#service-times')}
          >
            Join Us This Sunday
            <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            // Secondary button remains white outline, hover changes to amber
            className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-amber-700 shadow-2xl transition-all hover:scale-105 group text-lg px-8 py-6"
            onClick={() => window.open('https://youtube.com/@rccglivingspringyork9998?si=0Dgjg1NPHD5i49fa', '_blank')}
          >
            <FaVideo className="mr-2 h-5 w-5" />
            Watch Live
          </Button>
        </div>

        {/* Service Times Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center mb-3">
              {/* UPDATED: Icon background to amber */}
              <div className="p-3 bg-amber-500/80 rounded-xl group-hover:bg-amber-600 transition-colors">
                <FaCalendar className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm uppercase tracking-wide mb-2 text-amber-200">Sunday Worship</p>
            <p className="text-2xl">10:30 AM</p>
            <p className="text-sm text-gray-300 mt-2">Main Sanctuary</p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center mb-3">
              {/* UPDATED: Icon background to amber */}
              <div className="p-3 bg-amber-500/80 rounded-xl group-hover:bg-amber-600 transition-colors">
                <FaClock className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm uppercase tracking-wide mb-2 text-amber-200">Bible Study</p>
            <p className="text-2xl">Tuesday 8:30 PM</p>
            <p className="text-sm text-gray-300 mt-2">Mobile - 717-251-1272</p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-center mb-3">
              {/* UPDATED: Icon background to amber */}
              <div className="p-3 bg-amber-500/80 rounded-xl group-hover:bg-amber-600 transition-colors">
                <FaMapPin className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm uppercase tracking-wide mb-2 text-amber-200">Location</p>
            <p className="text-2xl">1550 Eleventh Avenue York, PA 17402</p>
            <p className="text-sm text-gray-300 mt-2">See full address</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}