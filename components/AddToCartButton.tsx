"use client"
import { Product } from "@/sanity.types"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import PriceQuantity from "./PriceQuantity";
import PriceFormatter from "./PriceFormatter";
import { useEffect, useState } from "react";
import userCartStore from "@/store";

interface Props{
    product:Product;
    className?:string
}

const AddToCartButton = ({product,className}:Props) => {
  const [isClient,setIsClient]=useState(false)
  const {addItem,getItemCount}=userCartStore()
  useEffect(()=>{
    setIsClient(true)
  },[])
  if(!isClient){
    return null
  }
  const itemCount=getItemCount(product?._id)
    const handleAddToCart=()=>{
        addItem(product)
        toast.success(`${product.name?.substring(0,12)}... added successfully`)
    }

  return (
    <div>
    {itemCount ? (
      <div>
        <div className="flex items-center justify-between gap-4 text-sm mb-1">
          <span className="text-xs text-muted-foreground font-semibold">quantity</span>
          <PriceQuantity product={product}/>
        </div>
        <div className="flex items-center justify-between text-sm border-t pt-1">
          <span className="text-xs text-muted-foreground font-semibold">subtotal</span>
          <PriceFormatter className="text-sm" amount={product?.price ? product?.price* itemCount :0}/>
        </div>
    </div>
    ):(
      <Button onClick={handleAddToCart} disabled={product?.stock ==0} className={cn(`w-full bg-blue-100 text-black text-sm font-medium
        border border-gray-400 tracking-wide hover:bg-blue-400 hover:text-white cursor-pointer
        duration-200 ease-in-out py-2 mt-2 disabled:text-gray-400 disabled:border-none`,className)}>Add To Cart</Button>
    )}
    </div>
  )
}

export default AddToCartButton