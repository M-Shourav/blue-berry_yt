import Container from '@/components/Container'
import ProductList from '@/components/ProductList'
import { getAllCategories, getAllProductCategories } from '@/sanity/helpers'
interface Props{
  params:Promise<{slug:string}>
}

const CategoriesPage =async ({params}:Props) => {
  const {slug}=await params  
  const categories=await getAllCategories()
  const products=await getAllProductCategories(slug)

  return (
    <div className='flex flex-col items-center bg-gray-100'>
        <Container className='w-full p-8 bg-white shadow-md rounded-md mt-3'>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold'>Search for result <span className='text-indigo-400'>
            {slug.split("-").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </span> collection</h1>
              <ProductList categories={categories} product={products}/>
          </div>
        </Container>
    </div>
  )
}

export default CategoriesPage