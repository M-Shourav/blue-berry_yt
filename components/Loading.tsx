import { loadingImg } from '@/images'
import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center 
    w-full min-h-screen z-50 bg-white p-10'>
        <div className=' relative w-24 h-24 flex items-center justify-center'>
            <div className='absolute inset-0 rounded-full border-2 border-dotted border-gray-400 animate-spin'/>
            <Image src={loadingImg} alt='loading-image' className='w-14 h-14 object-cover'/>

        </div>
    </div>
  )
}

export default Loading