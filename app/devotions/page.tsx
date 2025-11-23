'use client'
import React from 'react'
import EditableText from '@/components/hooks/EditableText'

const page = () => {
  return (
    <div className='mt-26 mx-3'>
      <h1 className='text-3xl font-bold text-center'>
        <EditableText slug='devotional_head' defaultText='Devotions' />
      </h1>
      <p className='text-red-500 text-2xl font-semibold my-2'>
        <EditableText slug='devotional_topic' defaultText='Depression' />
      </p>
      <EditableText slug='devotional_message' defaultText={`A teacher said to her students, "Boys and girls, there is a wonderful example in the life of the ant. Every day the ant goes to work and works all day. Every day the ant is busy. And in the end, what happens?
      Little Johnny said, "Someone steps on Him."</p>`} />
    </div>
  )
}

export default page
