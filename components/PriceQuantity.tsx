import React from "react";
import { Button } from "./ui/button";
import { HiMinus, HiPlus } from "react-icons/hi";
import toast from "react-hot-toast";
import { Product } from "@/sanity.types";
import userCartStore from "@/store";
import { cn } from "@/lib/utils";
interface Props {
  product: Product;
  className?: string;
  bodyStyle?: string;
}

const PriceQuantity = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = userCartStore();
  const itemCount = getItemCount(product?._id);
  const handleProductRemove = () => {
    removeItem(product?._id);
    toast.success("product remove");
  };
  const handleAddProduct = () => {
    addItem(product);
    toast.success("product added");
  };
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handleProductRemove}
        className="w-6 h-6 text-center cursor-pointer"
        variant="outline"
        size="icon"
      >
        <HiMinus />
      </Button>
      <span className="w-8 text-center text-blue-400 text-base">
        {itemCount}
      </span>
      <Button
        onClick={handleAddProduct}
        className="w-6 h-6 text-center cursor-pointer"
        variant="outline"
        size="icon"
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default PriceQuantity;
