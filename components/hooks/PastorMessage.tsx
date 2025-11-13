'use client'

import { BsQuote } from "react-icons/bs";
import { GiSparkles } from "react-icons/gi";

export function PastorMessage() {
  return (
    <section className="py-24 bg-linear-to-br from-red-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-100 to-red-50 text-red-700 rounded-full mb-6">
              <GiSparkles className="w-4 h-4" />
              <span>From Our Pastor</span>
            </div>

            <h2 className="text-5xl md:text-6xl mb-8 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              A Word From Pastor
            </h2>

            <div className="relative">
              {/* Decorative Quote */}
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-linear-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
                <BsQuote className="h-10 w-10 text-red-700" />
              </div>

              {/* Message Content */}
              <div className="pl-12 space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl text-gray-900">
                  Dear beloved in Christ,
                </p>
                <p className="text-lg">
                  Welcome to RCCG Living Spring! We are thrilled that you have
                  chosen to worship with us. Whether you are a first-time visitor or a
                  long-standing member, you are a valued part of our family.
                </p>
                <p className="text-lg">
                  Our parish is committed to raising champions - men and women who will
                  dominate their generation for Christ. Through the power of God's Word,
                  fervent prayer, and the manifestation of the Holy Spirit, we are building
                  a community of believers who are equipped to fulfill their divine purpose.
                </p>
                <p className="text-lg">
                  We invite you to join us as we pursue God's presence, grow in faith, and
                  make a lasting impact in York and beyond. Together, we will take heaven
                  and as many people as possible with us.
                </p>
              </div>
            </div>

            {/* Pastor Signature */}
            <div className="mt-10 pt-8 border-t-2 border-red-200 ml-12">
              <div className="space-y-3">
                <p className="text-lg text-gray-600 italic">
                  God bless you,
                </p>
                <div>
                  <p className="text-3xl bg-linear-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                    Pastor Olusola Osundeko & Pastor Teniola Osundeko
                  </p>
                  <p className="text-gray-600 mt-1">
                    Parish Pastors, RCCG Living Spring
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pastor Image */}
          <div className="order-1 lg:order-2">
            <div className="relative group">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-800 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-2xl" />

              {/* Accent Corner */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-red-700 to-red-900 rounded-2xl transform rotate-12 shadow-xl" />

              {/* Image Container */}
              <div className="relative transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <div className="overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white">
                  <img
                    src="/nsnrp.jpg"
                    alt="Pastor"
                    className="w-full h-auto object-cover aspect-4/5 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-red-900/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-110 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                    <GiSparkles className="w-6 h-6 text-red-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Leading with</p>
                    <p className="text-lg text-gray-900">Purpose & Vision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
