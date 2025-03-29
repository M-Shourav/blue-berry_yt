"use client";
import userCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);
  const getGroupItem = userCartStore((state) => state.getGroupItem());
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <Link
      href={"/cart"}
      className="flex items-center gap-2 px-2 py-1 shadow-md
       hover:shadow-none ring-1 ring-gray-100 rounded-sm duration-300"
    >
      <ShoppingBag className="w-6 h-6 text-blue-400" />
      <div className="flex flex-col">
        <p className="text-xs font-semibold">
          <span className="mr-1">
            {getGroupItem.length && getGroupItem.length > 0
              ? getGroupItem.length
              : 0}
          </span>
          items
        </p>
        <p className="text-sm font-semibold">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
