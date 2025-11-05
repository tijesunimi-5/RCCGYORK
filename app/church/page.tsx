'use client'
import React from 'react'

const page = () => {
  const medias = [
    {id: 1, image: "/youth/yimg4.jpg"},
    {id: 2, image: "/youth/yimg5.jpg"},
    {id: 3, image: "/youth/yimg6.jpg"},
    {id: 4, image: "/youth/yimg7.jpg"},
  ]

  return (
    <div className='relative min-h-screen  flex-col items-center justify-center '>
      <div className=' h-[40vh] overflow-hidden relative w-screen'>
        <img src="/youth/yasm.jpg" alt="youth" className=' top-0 w-full bg-cover h-[35vh] z-20' />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <h1 className='text-4xl md:text-6xl mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-center mt-10'>
          Welcome to Youth Adults & Single Ministry
        </h1>

        <p className=' text-gray-700 max-w-3xl mx-auto leading-relaxed'>
          The Young Adults and Single Ministry at Living Spring, York is a place where young adults (ages 19 to 40), professionals, and university students unite to ignite their faith and shine as beacons of light in a generation hungry for Jesus Christ's glory! We are a vibrant, Christ-centered community passionate about making God's kingdom a reality in our lives and our world.
        </p>        
      </div>

      <div className='flex justify-center items-center flex-col my-5 px-4'>
        <h2 className='text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>Our President</h2>
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'>
          <div className='h-[300px]'>
            <img src="/mCharles.jpg" alt="Charles Kennedy" />
          </div>
          <div className="content px-2 pb-1 bg-white bg-opacity-50 inset-0">
            <h1 className='font-semibold text-xl'>Mr Charles Kennedy</h1>
            <p className="mt-3"><b>Post: </b>Youth President</p>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative my-8'>
        <p className=' text-gray-700 max-w-3xl mx-auto leading-relaxed'>
          We are privileged to hold YASM services one Sunday per month, where we officiate every aspect of church as we pass vital kingdom messages! Whether you're seeking fellowship, purpose, or meaningful connections, YASM empowers you to live boldly for Christ while building lifelong friendships with like-minded believers.
        </p>
      </div>
      

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6'>
        <h2 className='text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>Medias</h2>
        {medias.map((media) => (
          <div key={media.id} className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-2xl hover-translate-y-2 transition-all border-0'>
            <img src={media.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
