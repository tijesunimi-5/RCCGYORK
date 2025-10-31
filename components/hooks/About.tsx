'use client'
import React from 'react'
import { FaBookOpen, FaGlobe, FaHeart, FaUser } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';
import { GiFlame } from 'react-icons/gi';

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

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
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
              <div
                key={value.title}
                className="group text-center p-8 rounded-2xl bg-linear-to-br from-white to-gray-50 hover:from-red-50 hover:to-white border border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300 mb-6 shadow-lg group-hover:scale-110">
                  <Icon className="h-10 w-10 text-red-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl mb-3 group-hover:text-red-700 transition-colors">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-linear-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            <div className="relative h-full min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1638866413606-e070e7defe21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBkaXZlcnNlfGVufDF8fHx8MTc2MTgxODU1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Community gathering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6 w-fit">
                <FaBookOpen className="w-4 h-4" />
                <span>Our Story</span>
              </div>
              <h3 className="text-4xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Living Spring
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  As a parish of the Redeemed Christian Church of God (RCCG), one of the fastest-growing
                  Pentecostal churches worldwide, we are part of a global movement committed to making
                  disciples of all nations.
                </p>
                <p>
                  At Living Spring in York, we believe that every believer is called to be a champion.
                  Through powerful worship, biblical teaching, fervent prayer, and the manifestation of
                  the Holy Spirit, we are equipping believers to fulfill their divine purpose.
                </p>
                <p>
                  Our vision is clear: to raise a generation of champions who will impact York, the UK,
                  and the nations with the gospel of Jesus Christ. We invite you to join this movement
                  and discover your place in God's kingdom agenda.
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
