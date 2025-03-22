import { Category, Product } from '@/sanity.types'
import Categories from './Categories'
import ProductGrid from './ProductGrid'
interface Props{
    product:Product[]
    title?:boolean,
    categories:Category[]
}

const ProductList = ({product,title,categories}:Props) => {
  return (
    <div className='pb-40'>
        <Categories categories={categories}/>
       {title && (
         <div className='flex flex-col gap-y-1 pb-5'>
         <h2 className='text-2xl font-semibold text-gray-600'>Day of the <span>Deal</span></h2>
         <p className='text-sm text-gray-700 font-medium'>Don&apos;t wait. The time will never be just right</p>
     </div>
       )}
      <ProductGrid product={product}/>
    </div>
  )
}

export default ProductList 