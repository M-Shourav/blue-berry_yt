import { Product } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import ProductCartBar from './ProductCartBar';
import { LuStar } from 'react-icons/lu';
import Link from 'next/link';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';
interface Props{
  product:Product;
}

const ProductCard = ({product}:Props) => {
  const isStock=product?.stock !==0  
  return (
    <div className='border border-gray-300 rounded-lg overflow-hidden group text-sm'>
      <div className='border-b border-b-gray-300 overflow-hidden relative'>
        {product?.image && (
      <Link href={`/product/${product?.slug?.current}`}>
        <Image src={urlFor(product.image).url()}
        alt='product-image'
        width={500} 
        height={500}
        loading='lazy'
        className={`w-full max-h-96 object-cover overflow-hidden 
        transition-transform duration-500 ease-in-out ${product?.stock !==0 && "group-hover:scale-105"}`}
        />
      </Link> 
      )}
      {product?.stock==0 && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/50
        flex items-center justify-center'>
          <p className='text-lg font-semibold text-white/90'>Out Of Stock</p>
        </div>
      )}
      {product?.status && product?.stock !==0 && (
        <div className='absolute top-2 left-2 flex flex-col items-center
         space-y-1 z-10 group-hover:opacity-0 duration-300'>
          {product?.status.split("").map((char,index)=>(
            <span key={index} className='font-semibold uppercase'>{char}</span>
          ))}
        </div>
      )}
      {isStock && (
        <div className='absolute bottom-3 left-0 w-full translate-y-16 
        group-hover:-translate-y-0 duration-300 transition-transform'>
          <ProductCartBar/>
        </div>
      )}
      </div>
      {/* description */}
      <div className='p-5 flex flex-col gap-2'>
     <div className='flex items-center justify-between'>
     <p className='text-gray-400 font-medium'>snacks</p>
      <div className='flex items-center gap-1'>
        {Array.from({length:5}).map((_,index)=>{
          const isLastStar=index==4
          return(
            <LuStar key={index} 
            fill={`${!isLastStar ? "#fca99b" :"transparent"}`}
            className={`${isLastStar ? "text-gray-400" :"text-orange-500"}`}
            />
          )
          })}
      </div>
     </div>
     <p className='text-base font-semibold text-gray-600 line-clamp-1'>{product?.name}</p>
     <PriceView price={product?.price} discount={product?.discountPrice} label={product?.label} />
     <AddToCartButton product={product}/>
      </div>
    </div>
  )
}

export default ProductCard