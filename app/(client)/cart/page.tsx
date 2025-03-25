'use client'
import { createCheckoutSession, MetaData } from '@/actions/createCheckoutSession'
import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import Loading from '@/components/Loading'
import NoAccessToCart from '@/components/NoAccessToCart'
import PriceFormatter from '@/components/PriceFormatter'
import PriceQuantity from '@/components/PriceQuantity'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/sanity/lib/image'
import userCartStore from '@/store'
import { useAuth, useUser } from '@clerk/nextjs'
import { ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CartPage = () => {
  const {getItemCount,getSubTotalPrice,getTotalPrice,resetCart,deleteCartProduct}=userCartStore()
  const getGroupItem=userCartStore((state)=>state.getGroupItem())
  const {isSignedIn}=useAuth()
  const {user}=useUser()
  const [isLoading,setIsLoading]=useState(false)
  const [isClient,setIsClient]=useState(false)
  useEffect(()=>{
    setIsClient(true)
  },[])
  if(!isClient){
    return <Loading/>
  }
  const handleCheckOut=async()=>{
    setIsLoading(true)
    try {
      const metadata:MetaData={
        orderNumber:crypto.randomUUID(),
        customerName:user?.fullName ?? "unknown",
        customerEmail:user?.emailAddresses[0]?.emailAddress ?? "unknown",
        clerkUserId:user!?.id
      }
      
      const checkoutUrl=await createCheckoutSession(getGroupItem,metadata)
      if(checkoutUrl){
        window.location.href=checkoutUrl
      }
      
    } catch (error) {
      console.error('Error creating checkout session:',error)
    }finally{
      setIsLoading(false)
    }
  }

  const handleProductDelete=(_id:string)=>{
    deleteCartProduct(_id)
    toast.success('product delete successfully')
  }

  const handleResetCart=()=>{
    const confirmed=window.confirm("Are you sure to reset your cart?")
    if(confirmed){
      resetCart()
      toast.success("Your cart is reset successfully")
    }
  }

  return (
    <div className='pb-10 '>
     {isSignedIn ? (
        <Container className='py-10 bg-gray-50'>
          {getGroupItem.length ? (
          <>
          <div className='flex items-center gap-2 py-5'>
            <ShoppingBag className='w-7 h-7 text-gray-800'/>
            <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
          </div>
          <div className='grid lg:grid-cols-3 md:gap-8'>
            <div className='lg:col-span-1'>
              <div className=' hidden md:inline-block w-full bg-white p-6 rounded-md
               border'>
              <h2 className='text-xl font-semibold mb-4'>Order summary</h2>
              <div className='space-y-4 mb-2'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Subtotal</span>
                <PriceFormatter amount={getSubTotalPrice()}/>
              </div>
              </div>
              <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Discount</span>
                <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
              </div>
              </div>
              <div className='w-full border border-gray-300 mt-1'/>
              <div className='space-y-4 mt-2'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Total</span>
                <PriceFormatter amount={getTotalPrice()}/>
              </div>
              </div>
              <div className='space-y-4 py-5 flex flex-col items-center'>
                <Button onClick={handleCheckOut} className='w-full cursor-pointer' disabled={isLoading}>
                  {isLoading ? <div className='flex items-center justify-center gap-x-5 w-full text-base'>
                    <p>Processing...</p>
                    <span className='text-xl animate-spin'><AiOutlineLoading3Quarters/></span>
                  </div> :"Proceed to checkout"}
                </Button>
                <Link href={'/'} className='text-base font-semibold hover:underline hover:text-blue-400 duration-300'>Continue Shopping</Link>
              </div>
              </div>
            </div>
            <div className='lg:col-span-2 pb-5'>
              <div className='grid grid-cols-5 md:grid-cols-6 border p-2.5 rounded-tr-lg rounded-tl-lg
              bg-white text-base font-normal'>
                <b className='col-span-2 lg:col-span-3'>Product</b>
                <b>Price</b>
                <b>Quantity</b>
                <b>Total</b>
              </div>
              <div>
                {getGroupItem?.map((product)=>{
                  const itemCount=getItemCount(product.product._id)
                  return(
                    <div key={product?.product._id} className='grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0'>
                     <div className='col-span-2 md:col-span-3 flex items-center gap-2'>
                      <Trash2 className='cursor-pointer hover:text-red-600 duration-300 ease-in-out' onClick={()=>{
                        handleProductDelete(product.product._id)
                      }}/>
                      {product.product?.image && <Image src={urlFor(product.product.image).url()} alt='products-image'
                       width={300}
                       height={300}
                       className='w-14 h-14 object-cover'/>}
                       <p className='text-sm hidden sm:inline-block'>{product.product?.name}</p>
                     </div>
                     <div className='flex items-center'>
                      <PriceFormatter amount={product.product.price}/>
                     </div>
                     <PriceQuantity className='flex items-center gap-x-1 text-sm' product={product.product}/>
                     <div className='flex items-center'>
                      <PriceFormatter  amount={product.product.price ? product.product.price * itemCount :0}/>
                     </div>
                    </div>
                  )
                })}
                <div className='py-5'>
                  <Button variant="destructive" className=' cursor-pointer' onClick={handleResetCart}>Reset Cart</Button>
                </div>
              </div>
            </div>
          </div>
          {/* mobile */}
        <div className='md:hidden w-full'>
        <div className='p-4 rounded-lg border mx-4'>
              <h2 className='text-xl font-semibold mb-4'>Order summary</h2>
              <div className='space-y-4 mb-2'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Subtotal</span>
                <PriceFormatter amount={getSubTotalPrice()}/>
              </div>
              </div>
              <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Discount</span>
                <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()}/>
              </div>
              </div>
              <div className='w-full border border-gray-300 mt-1'/>
              <div className='space-y-4 mt-2'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-semibold'>Total</span>
                <PriceFormatter amount={getTotalPrice()}/>
              </div>
              </div>
              <div className='space-y-4 py-5 flex flex-col items-center'>
              <Button onClick={handleCheckOut} className='w-full cursor-pointer' disabled={isLoading}>
                  {isLoading ? <div className='flex items-center justify-center gap-x-5 w-full text-base'>
                    <p>Processing...</p>
                    <span className='text-xl animate-spin'><AiOutlineLoading3Quarters/></span>
                  </div> :"Proceed to checkout"}
                </Button>
                <Link href={'/'} className='text-base font-semibold hover:underline hover:text-blue-400 duration-300'>Continue Shopping</Link>
              </div>
          </div>
        </div>
          </>
          ):(
            <EmptyCart/>
          )}
        </Container>
     ):(
        <NoAccessToCart/>
     )}
    </div>
  )
}

export default CartPage