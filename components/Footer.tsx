import React from 'react'
import Container from './Container'
import Image from 'next/image'
import { payment } from '@/images'

const Footer = () => {
  return (
    <footer className='w-full bg-gray-100 py-4'>
      <Container className='flex items-center justify-center xl:justify-between'>
        <p className='text-gray-600 text-sm'>CopyRights © 2025 <span className='text-blue-400 font-semibold'>Masum-ahmed</span> all rights reserve.</p>
        <Image src={payment} alt='payment' className='w-64 hidden xl:inline-flex'/>
      </Container>
    </footer>
  )
}

export default Footer