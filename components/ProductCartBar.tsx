import React from 'react'
import { GoHeart } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { LuArrowRightLeft } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
const ProductCartBar = () => {
  return (
    <div className='text-lg text-gray-400 flex items-center justify-center gap-2.5'>
        <div className='border shadow-md bg-white rounded-xl p-2 hover:bg-blue-400
        hover:text-white duration-300 ease-in-out'>
            <GoHeart/>
        </div>
        <div className='border shadow-md bg-white rounded-xl p-2 hover:bg-blue-400
        hover:text-white duration-300 ease-in-out'>
            <FaRegEye/>
        </div>
        <div className='border shadow-md bg-white rounded-xl p-2 hover:bg-blue-400
        hover:text-white duration-300 ease-in-out'>
            <LuArrowRightLeft/>
        </div>
        <div className='border shadow-md bg-white rounded-xl p-2 hover:bg-blue-400
        hover:text-white duration-300 ease-in-out'>
            <FiShoppingCart/>
        </div>
    </div>
  )
}

export default ProductCartBar