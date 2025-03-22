import { ShoppingCart } from 'lucide-react'
import {motion} from "framer-motion"
import Image from 'next/image'
import { emptyCart } from '@/images'
import Link from 'next/link'

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-2'>
            <motion.div 
            animate={{scale:[1,1.2,1]}}
            transition={{repeat:Infinity,duration:2}}
            className='inline-block'
            >
                <ShoppingCart size={64} className='text-muted-foreground'/>
            </motion.div>
            <Image src={emptyCart} alt='emptyCart' width={300} height={300} className='mx-auto rounded-lg shadow-md'/>
            <h2 className='text-3xl font-bold text-gray-800'>Your Cart is Empty!</h2>
            <p className='text-gray-600 text-sm max-w-md mx-auto text-center'>Looks like you haven&apo;t added anything to your cart yet.Explore our products and find anything you love!</p>
            <Link href={"/"} className='px-4 py-2 bg-blue-500 text-white rounded-md text-base 
            font-semibold hover:bg-blue-600 duration-300 ease-in-out'>Continue Shopping</Link>
    </div>
  )
}

export default EmptyCart