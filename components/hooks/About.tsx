'use client'
import React, { useEffect } from 'react'
import { FaBookOpen, FaGlobe, FaHeart, FaUser } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';
import { GiFlame } from 'react-icons/gi';
// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: 'Worship',
      description: 'Authentic worship that honors God and transforms lives through His presence.',
    },
    {
      icon: FaUser,
      title: 'Community',
      description: 'Building a family of believers who support, encourage, and grow together.',
    },
    {
      icon: FaBookOpen,
      title: 'Scripture',
      description: 'Grounded in Biblical truth and committed to teaching the uncompromising Word.',
    },
    {
      icon: FaGlobe,
      title: 'Mission',
      description: 'Reaching York and the nations with the transforming gospel of Jesus Christ.',
    },
    {
      icon: FiTarget,
      title: 'Purpose',
      description: 'Equipping champions to fulfill their divine purpose and destiny in God.',
    },
    {
      icon: GiFlame,
      title: 'Holy Spirit',
      description: 'Spirit-led ministry manifesting the power and gifts of the Holy Ghost.',
    },
  ];

  // useEffect(() => {
  //   // Collect all elements we want to animate with scrub
  //   const elementsToAnimate = gsap.utils.toArray('.js-about-animate') as gsap.DOMTarget[];

  //   elementsToAnimate.forEach((element, i) => {
  //     // Set initial state: shifted down and invisible
  //     gsap.set(element, { opacity: 0, y: 80 });

  //     // Animate to final state (opacity 1, y 0), scrubbing with the scroll
  //     gsap.to(element, {
  //       opacity: 1,
  //       y: 0,
  //       duration: 1,
  //       ease: 'none', // Use 'none' for pure scrub linking
  //       scrollTrigger: {
  //         trigger: element as gsap.DOMTarget,
  //         start: 'top 95%', // Start early, when element is near the bottom
  //         end: 'center 70%', // End earlier, so the animation is complete sooner
  //         scrub: 1, // Smoothly link the animation to the scroll
  //       }
  //     });
  //   });

  //   // Special animation for the image/text split block
  //   // We want the image and text to slide horizontally, but still scrubbed.
  //   gsap.set('.js-story-image', { x: -100, opacity: 0 });
  //   gsap.to('.js-story-image', {
  //     x: 0,
  //     opacity: 1,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: '.js-story-block',
  //       start: 'top 90%',
  //       end: 'center 50%',
  //       scrub: 1,
  //     }
  //   });

  //   gsap.set('.js-story-content', { x: 100, opacity: 0 });
  //   gsap.to('.js-story-content', {
  //     x: 0,
  //     opacity: 1,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: '.js-story-block',
  //       start: 'top 90%',
  //       end: 'center 50%',
  //       scrub: 1,
  //     }
  //   });

  // }, []);


  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* === Header - Added class: js-about-animate === */}
        <div className="text-center mb-16 js-about-animate">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-100 to-red-50 text-red-700 rounded-full mb-6">
            <FaHeart className="w-4 h-4" />
            <span>Who We Are</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            About RCCG Living Spring
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Living Spring is a vibrant, Spirit-filled parish of the Redeemed Christian Church of God,
            committed to raising champions who will dominate their generation for Christ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              // === Values Card - Added class: js-about-animate ===
              <div
                key={value.title}
                className="js-about-animate group text-center p-8 rounded-2xl bg-linear-to-br from-white to-gray-50 hover:from-red-50 hover:to-white border border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300 mb-6 shadow-lg group-hover:scale-110">
                  <Icon className="h-10 w-10 text-red-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl mb-3 group-hover:text-red-700 transition-colors">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>

        {/* === Story Block - Added class: js-story-block for trigger === */}
        <div className="js-story-block bg-linear-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* === Story Image - Added class: js-story-image === */}
            <div className="relative h-full min-h-[400px] js-story-image">

              <img
                src="/church-pic.jpg"
                alt="Community gathering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </div>
            {/* === Story Content - Added class: js-story-content === */}
            <div className="p-8 md:p-12 flex flex-col justify-center js-story-content">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6 w-fit">
                <FaBookOpen className="w-4 h-4" />
                <span>Our Story</span>
              </div>
              <h3 className="text-4xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Living Spring
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  This church was started in March 2009 as a church planted by Living Spring Harrisburg. <br />
                  We had our first worship service at the Comfort Inn & Suites, York and held subsequent services at the nearby Homewood Suites.
                </p>
                <p>
                  By September 2009, Pastor Sam Anyanwu took over as the first pastor. Before he left, the lord used him to take the church from meeting in the hotel to a more comfortable location at 2346B Carnegie Road at East York. <br />
                  Pastor Victor Johnsons pastored the church from January 2012 through February 2013. He left to pastor RCCG Lancaster which had been planted by our Harrisburg parish in September 2012.
                </p>
                <p>
                  This transitionary period was a very difficult time for our church, due to the fluid nature of things. Membership declined significantly and morale was very low. But the Rock of Ages who never changes kept a remnant unto Himself. By the grace of God, this church rose from the ashes and blossomed and thrived to where it is today. 'Not by might nor by power, but by My Spirit,' says the LORD of hosts. (Zechariah 4:6).
                </p>
                <p>
                  We aim to be a family-friendly church where love is not just an idea but a principle that undergird all that we do. We want our meetings to be opportunities to meet with God and for God to meet with His people. <br />
                  Our church aims to be a place where to be a place where members are baptized in the Holy Spirit and learn to walk in the Spirit all the days of their lives.

                </p>
                <p>
                  We aim to be a church where freshly baked spiritual bread is distributed weekly to feed the sheep. This church is a refuge for sinners, hospital for the sick, miracle center for the needy and a haven of rest for the weary. We aim to develop a people who are Christ-centered and eternity-focused, faithful in ensuring that His will is done on earth as it is in heaven.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About
