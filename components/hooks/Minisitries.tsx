'use client'

import { FaBaby, FaBookOpen, FaGlobe, FaMusic, FaUser, FaUserCheck } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Card";
import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6";
import { GiSparkles } from "react-icons/gi";
import { useRouter } from "next/navigation";

export function Ministries() {
  const router = useRouter()
  const ministries = [
    {
      icon: FaUser,
      title: 'Adult Ministry',
      description: 'Small groups, discipleship programs, and Bible studies for spiritual growth and maturity.',
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-700',
      // href: "/church"
    },
    {
      icon: GiSparkles,
      title: 'Youth & Teens',
      description: 'Dynamic programs for young people to grow in faith and discover their purpose.',
      color: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-700',
      href: "/Youth"
    },
    {
      icon: FaBaby,
      title: "Children's Church",
      description: 'Age-appropriate teaching and activities that make learning about Jesus fun and engaging.',
      color: 'from-pink-100 to-pink-200',
      iconColor: 'text-pink-700',
      href: "/children-unit"
    },
    {
      icon: FaMusic,
      title: 'Worship Ministry',
      description: 'Join our choir, band, or media team to serve through worship and the arts.',
      color: 'from-red-100 to-red-200',
      iconColor: 'text-red-700',
      // href: "/worship"
    },
    {
      icon: FaUserCheck,
      title: 'Ushering & Protocol',
      description: 'First impressions team welcoming guests and ensuring orderly services.',
      color: 'from-green-100 to-green-200',
      iconColor: 'text-green-700',
      href: "/ushering-unit"
    },
    {
      icon: FaBookOpen,
      title: 'Prayer & Intercession',
      description: 'Prayer warriors standing in the gap and seeking God for breakthroughs.',
      color: 'from-indigo-100 to-indigo-200',
      iconColor: 'text-indigo-700',
    },
    // {
    //   icon: FaHeart,
    //   title: 'Welfare & Support',
    //   description: 'Practical help and support for members and the community in need.',
    //   color: 'from-rose-100 to-rose-200',
    //   iconColor: 'text-rose-700',
    //   href: "/welfare"
    // },
    {
      icon: FaGlobe,
      title: 'Missions & Outreach',
      description: 'Taking the gospel beyond our walls through evangelism and community service.',
      color: 'from-teal-100 to-teal-200',
      iconColor: 'text-teal-700',
      href: "/outreach"
    },
  ];

  return (
    <section id="ministries" className="py-24 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-100 to-red-50 text-red-700 rounded-full mb-6">
            <FaUser className="w-4 h-4" />
            <span>Get Involved</span>
          </div> */}
          <h2 className="text-5xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our Ministries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find your place to grow, serve, and make an impact in the kingdom of God

          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ministries.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <Card
                key={ministry.title}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white relative"
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

        {/* Call to Action */}
        {/* <div className="mt-16 text-center bg-linear-to-br from-red-700 via-red-800 to-red-900 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl mb-4">Ready to Get Involved?</h3>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Every member is a minister. Discover your gifts and find your place in ministry.
            </p>
            <button
              className="px-8 py-4 bg-white text-red-700 rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Contact Us to Join a Ministry
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
