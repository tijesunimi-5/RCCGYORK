'use client'
import React, { useEffect } from 'react';
import { FaBaby, FaBookOpen, FaGlobe, FaUser, FaUserCheck } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Card";
import { FaArrowUpRightFromSquare, FaPeopleGroup } from "react-icons/fa6";
import { GiSparkles } from "react-icons/gi";
import { useRouter } from "next/navigation";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


export function Ministries() {
  const router = useRouter()
  const ministries = [
    {
      icon: FaUser,
      title: "Adult Ministry",
      description:
        "Small groups, discipleship programs, and Bible studies for spiritual growth and maturity.",
      color: "from-blue-100 to-blue-200",
      iconColor: "text-blue-700",
      href: "/church",
    },
    {
      icon: GiSparkles,
      title: "Youth & Teens",
      description:
        "Dynamic programs for young people to grow in faith and discover their purpose.",
      color: "from-purple-100 to-purple-200",
      iconColor: "text-purple-700",
      href: "/Youth",
    },
    {
      icon: FaBaby,
      title: "Children's Church",
      description:
        "Age-appropriate teaching and activities that make learning about Jesus fun and engaging.",
      color: "from-pink-100 to-pink-200",
      iconColor: "text-pink-700",
      href: "/children-unit",
    },
    {
      icon: FaPeopleGroup,
      title: "Women of Virtue",
      description:
        "The Women's Ministry at RCCG Living Spring York is a place where women of all ages and walks of life unite to glorify God through prayer, worship, and transformative Scripture study",
      color: "from-red-100 to-red-200",
      iconColor: "text-red-700",
      href: "/women-of-virtue"
    },
    {
      icon: FaUserCheck,
      title: "Ushering & Protocol",
      description:
        "First impressions team welcoming guests and ensuring orderly services.",
      color: "from-green-100 to-green-200",
      iconColor: "text-green-700",
      href: "/ushering-unit",
    },
    {
      icon: FaBookOpen,
      title: "Men of Valor",
      description:
        "Men of Valor is a place where men and young men unite to grow in faith, leadership, and service.",
      color: "from-indigo-100 to-indigo-200",
      iconColor: "text-indigo-700",
      href: "/men-of-valor",
    },

    {
      icon: FaGlobe,
      title: "Missions & Outreach",
      description:
        "Taking the gospel beyond our walls through evangelism and community service.",
      color: "from-teal-100 to-teal-200",
      iconColor: "text-teal-700",
      href: "/outreach",
    },
  ];

  useEffect(() => {
    // 1. Animate Header (smooth slide up scrub)
    const headerTarget: gsap.DOMTarget = '.js-ministry-header';
    gsap.set(headerTarget, { opacity: 0, y: 30 }); // Lower starting point
    gsap.to(headerTarget, {
      opacity: 1,
      y: 0,
      ease: 'none', // Critical for smooth scrub
      scrollTrigger: {
        trigger: headerTarget,
        start: 'top 90%',
        end: 'center 70%',
        scrub: 1, // Smoothly tied to scroll
      }
    });

    // 2. Animate Cards (individual slide up scrub)
    const cardTargets: gsap.DOMTarget[] = gsap.utils.toArray('.js-ministry-card');

    cardTargets.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 50 }); // Lower starting point
      gsap.to(card, {
        opacity: 1,
        y: 0,
        ease: 'none', // Critical for smooth scrub
        scrollTrigger: {
          trigger: card, // Use the individual card as the trigger
          start: 'top 95%',
          end: 'center 80%',
          scrub: 1,
        }
      });
    });

  }, []);


  return (
    <section id="ministries" className="py-24 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* === Header - Added class: js-ministry-header === */}
        <div className="text-center mb-16 js-ministry-header">

          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our Ministries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find your place to grow, serve, and make an impact in the kingdom of God
          </p>
        </div>

        {/* === Card Grid - Added class: js-ministry-grid for context === */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 js-ministry-grid">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              // === Card Item - Added class: js-ministry-card ===
              <Card
                key={ministry.title}
                className="js-ministry-card group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white relative"

              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${ministry.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${ministry.iconColor}`} />
                  </div>
                  {
                    ministry.href && (
                      <FaArrowUpRightFromSquare className="absolute right-8 top-5 cursor-pointer" onClick={() => router.push(ministry.href)} />
                    )
                  }
                  <CardTitle className="text-xl group-hover:text-red-700 transition-colors">
                    {ministry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {ministry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

