'use client'
import React from 'react'

const page = () => {
  const teachers = [
    { name: "Simisola Adebayo", post: "Head of Department", image: "/youth/simi.jpg" },
    { name: "Ivie Edebiri", post: "Teacher", image: "/youth/ivie.jpg" },
    { name: "Olive Gray", post: "Teacher", image: "/youth/olive.jpg" },
    { name: "Arinola Ogunneye", post: "Teacher", image: "/youth/ogunneye.jpg" }
  ]

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center pt-20'>
      <div className=' h-[40vh] overflow-hidden relative w-screen'>
        <img src="/youth/youth-bg.jpg" alt="youth" className=' top-0 w-full bg-cover h-[35vh] z-20' />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Welcome to Youth Three Sixteen
        </h1>
        <p className='text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed'>
          Youth department (from Age 13 - 18) this class is staffed with trained friendly, and well-qualified
        </p>


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
      </div>
    </div>
  )
}

export default page
