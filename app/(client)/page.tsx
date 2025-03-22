import React from 'react'
import { getAllCategories, getProduct, getSales } from '@/sanity/helpers'
import DiscountBanner from '@/components/DiscountBanner';
import ProductList from '@/components/ProductList';
import Container from '@/components/Container';

const Home = async () => {
  const sales=await getSales()  
  const product=await getProduct()  
  const categories=await getAllCategories()  
  return (
    <div>
     <Container>
     <DiscountBanner sales={sales}/>
     <ProductList product={product} categories={categories} title={true}/>
     </Container>
    </div>
  )
}

export default Home