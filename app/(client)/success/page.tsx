"use client";
import userCartStore from "@/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const { resetCart } = userCartStore();
  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }
  }, [orderNumber, resetCart]);
  return (
    <div className="py-10 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-md rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: "200" }}
          className="w-24 h-24 flex items-center justify-center bg-green-100
          rounded-full shadow-lg mx-auto mb-8"
        >
          <Check className="w-12 h-12 text-teal-600" />
        </motion.div>
        <h1 className="text-xl sm:text-3xl font-semibold">Order Confirmed</h1>
        <div className="space-y-4 mb-8 text-gray-600 text-center">
          <p>
            Thank you for purchase. we&apos;re processing you order and will
            ship it soon. A confirmation email with your order details will be
            sent to your email shortly
          </p>
          <p className="text-black font-semibold">
            Order Number: <span>{orderNumber}</span>
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h2 className="text-base font-semibold text-green-800 mb-2">
            What&apos;s Next?
          </h2>
          <ul className=" space-y-1 text-sm text-green-700">
            <li>Check your email for order confirmation</li>
            <li>we&apos;ll notify you when your order ships</li>
            <li>Track your order status anytime</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href={"/"}
            className="flex items-center justify-center font-semibold px-2 py-3 rounded-lg
          bg-green-500 text-white hover:bg-green-600 shadow-md duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href={"/order"}
            className="flex items-center justify-center font-semibold px-2 py-3 rounded-lg
          bg-green-500 text-white hover:bg-green-600 shadow-md duration-300"
          >
            <Package className="w-5 h-5 mr-2" />
            Order
          </Link>
          <Link
            href={"/"}
            className="flex items-center justify-center font-semibold px-2 py-3 rounded-lg
          bg-green-500 text-white hover:bg-green-600 shadow-md duration-300"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
