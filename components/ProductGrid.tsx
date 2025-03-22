import { Product } from "@/sanity.types"
import ProductCard from "./ProductCard"

interface Props{
    product:Product[]
}

const ProductGrid = ({product}:Props) => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
    {product?.map((product)=>(
        <ProductCard key={product?._id} product={product}/>
    ))}
</div>
  )
}

export default ProductGrid