import React from 'react'
import Container from './Container'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import { logo } from '@/images'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const NoAccessToCart = () => {
  return (
    <Container className='py-12 md:py-32 flex items-center justify-center bg-gray-100'>
        
       <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 flex items-center'>
            <div className='flex items-center'>
                <Image src={logo} alt='logo' width={80} height={80} priority={true} />
            </div>
         <CardTitle className='text-2xl font-bold'>Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground text-center'>Login to view your cart items and checkout.Don&apo;t miss out on your favorite products.</p>
        <SignInButton mode='modal'>
            <Button className='w-full cursor-pointer'>SignIn</Button>
        </SignInButton>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
            <div>
                Don&apos;t have an account?
            </div>
            <SignUpButton mode='modal'>
                <Button variant="outline" size="lg" className='w-full cursor-pointer'>Create an account</Button>
            </SignUpButton>
        </CardFooter>
       </Card>
        
    </Container>
  )
}

export default NoAccessToCart