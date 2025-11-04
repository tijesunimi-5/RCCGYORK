'use client'
import React from 'react'

const page = () => {
  const teachers = [
    {name: "Dr. Innocent Ononiwu", post: "Head of KidZone children's department", image: "/drinnocent.jpg"},
    {name: "Mrs. Helen Ugo-Onyeulo", post: "Age 3 - 5 teacher", image: "/children/helen.jpg"},
    {name: "Mrs. Bernarde Munoz", post: "Age 0 - 3 teacher", image: "/children/bern.jpg"},
  ]

  const medias = [
    {id: 1, image: "/children/child2.jpg"},
    {id: 2, image: "/children/child3.jpg"},
    {id: 3, image: "/children/child4.jpg"},
    {id: 4, image: "/children/child5.jpg"},
    {id: 5, image: "/children/child6.jpg"},
  ]

  return (
    <div className=' flex-col items-center justify-center '>
      <div className=' h-[40vh] overflow-hidden relative w-screen'>
        <img src="/youth/yasm.jpg" alt="youth" className=' top-0 w-full bg-cover h-[35vh] z-20' />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Welcome to Children Church
        </h1>

        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed'>
          AtRCCG Living Spring York Children's Chrch, we create a dynamic, Christ-centered aged 2 - 12  grow in faith, character, and community. Our inistry blends Bible-based teachings, interactive activities, and creative learning to inspire young hearts towards a lifelong relationship with Jesus. Parents trust us to provide a secure, structured environment during services, allowing them to  worship freely while their  children embark on joyful spiritual adventures.
        </p>

        <h2 className='text-2xl font-semibold mt-10'>
          programs and Activities:
        </h2>
        <p className='text-gray-700 max-w-3xl mx-auto leading-relaxed'>
          From Sunday School lessons tailored to different age groups to our annual Vacation Bible School (VBS) - packed with games, music, crafts, and Scripture memorization - we make faith fun and relatable.
        </p>
      </div>

      <div className="text-center mt-9">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Our Teachers
        </h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
          {teachers.map((teacher) => (
            <div key={teacher.name} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'>
              <div className="w-full">
                <img src={teacher.image} alt={teacher.name} className='h-[300px] w-full' />
              </div>

              <div className="content px-2 pb-1 text-start">
                <h2 className='font-semibold text-xl'>{teacher.name}</h2>
                <p className="mt-3">
                  <b>Post: </b>
                  {teacher.post}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-9 mb-10">
        <h2 className="text-3xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Medias
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
          {medias.map((media) => (
            <div key={media.id} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'>
              <img src={media.image} className='w-full h-full' />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default page
