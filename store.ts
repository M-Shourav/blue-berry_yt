import {create } from "zustand"
import { Product } from "./sanity.types"
import { persist } from "zustand/middleware";

export interface CartItem{
    product:Product
    quantity:number
}

interface CartState{
    items:CartItem[]
    addItem:(product:Product)=>void;
    removeItem:(productId:string)=>void;
    deleteCartProduct:(productId:string)=>void;
    resetCart:()=>void
    getTotalPrice:()=>number
    getSubTotalPrice:()=>number
    getItemCount:(ProductId:string)=>number
    getGroupItem:()=>CartItem[]
}

const userCartStore=create<CartState>()(persist((set,get)=>({
    items:[],
    addItem:(product)=>set((state)=>{
        const existingItem=state.items.find((item)=>item.product._id==product._id)
        if(existingItem){
            return {
                items:state.items.map((item)=>item?.product._id==product._id ?{...item, quantity:item?.quantity+1} :item)
            }
        }else{
           return {items:[...state.items,{product,quantity:1}]}
        }
    }),
    
    removeItem:(productId)=>{
        set((state)=>({
            items:state.items.map((item)=>item.product._id==productId ?{...item,quantity:item.quantity-1} :item).filter((item)=>item.quantity>0)
        }))
    },

    deleteCartProduct:(productId)=>{
        set((state)=>({
            items :state.items.filter((item)=>item.product._id!==productId)
        }))
    },
  resetCart:()=>{set({items:[]})},

  getTotalPrice:()=>{
    return get().items.reduce((total,item)=>total + (item?.product.price ?? 0) * item?.quantity,0)
  },

  getSubTotalPrice:()=>{
    return get().items.reduce((total,item)=>{
        const price=item?.product.price ?? 0;
        const discount=((item.product.discountPrice ?? 0 )* price) /100;
        const discountPrice=price + discount;
        return total + discountPrice * item.quantity
    },0)
  },
  getItemCount:(productId)=>{
    const item=get().items.find((item)=>item.product._id===productId);
    return item ? item.quantity :0
  },
  getGroupItem:()=>{
    return get().items
  }




}),
{name:"Cart-store"}
)
)

export default userCartStore