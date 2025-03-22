import { SALES_QUERYResult } from '@/sanity.types'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const DiscountBanner = ({sales}:{sales:SALES_QUERYResult}) => {
  return (
<div className='py-10'>
<Carousel className=''>
      <CarouselContent>
        {
          sales?.map((sale)=>(
            <CarouselItem key={sale?._id}>
              <Card>
                <CardContent>
                  <div className='flex flex-col md:flex-row md:items-center justify-between px-4 ml-2'>
                    <div className='flex flex-col gap-y-1 p-6 md:px-12'>
                      <Badge variant="secondary" className='bg-blue-200'>{sale?.Badge} {sale?.discountAmount}% Off</Badge>
                      <h2 className='text-2xl md:text-3xl font-bold tracking-tight capitalize'>{sale?.title}</h2>
                    <p className='text-muted-foreground'>{sale?.description}</p>
                    <p>User Code: <span className="text-blue-400 font-semibold">{sale?.couponCode}</span> for <span className='text-blue-400 font-semibold'>{sale?.discountAmount}% off</span></p>
                    <Button className='w-fit mt-3'>Shop Now</Button>
                    </div>
                    {sale?.productImage && (
                      <div className='w-full md:w-1/2 flex items-center justify-center h-auto py-2'>
                        <Image src={urlFor(sale?.productImage).url()} alt='banner-image' priority={true}
                         width={500}
                         height={500}
                         className='h-full transition-transform hover:scale-105 duration-500 ease-in-out'
                          />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className=' absolute left-5 md:left-2'/>
      <CarouselNext className=' absolute right-5 md:right-2'/>
    </Carousel>
</div>
  )
}

export default DiscountBanner