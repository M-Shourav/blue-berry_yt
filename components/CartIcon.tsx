"use client";
import userCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
const CartIcon = () => {
  const getGroupItem = userCartStore((state) => state.getGroupItem());
  return (
    <Link
      href={"/cart"}
      className="flex items-center gap-2 px-2 py-1 shadow-md
     hover:shadow-none ring-1 ring-gray-100 rounded-sm duration-300"
    >
      <ShoppingBag className="w-6 h-6 text-blue-400" />
      <div className="flex flex-col">
        <div className="text-xs font-semibold flex items-center gap-x-1">
          <span>
            {getGroupItem.length && getGroupItem.length > 0
              ? getGroupItem.length
              : 0}
          </span>
          items
        </div>
        <p className="text-sm font-semibold">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
