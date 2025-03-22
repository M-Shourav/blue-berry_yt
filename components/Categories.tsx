import { Category } from '@/sanity.types'
import React from 'react'
import CategorySelector from './CategorySelector'

const Categories = ({categories}:{categories:Category[]}) => {
  return (
    <div className='py-10'>
      <CategorySelector categories={categories}/>
    </div>
  )
}

export default Categories