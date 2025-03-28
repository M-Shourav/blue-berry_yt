"use client";
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";

const OrdersComponents = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders?.map((order) => (
            <Tooltip key={order?.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow className=" cursor-pointer bg-gray-100 h-12">
                  <TableCell>
                    {order?.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate &&
                      new Date(order?.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order?.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter amount={order?.totalPrice} />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`capitalize font-semibold ${order?.status == "paid" ? "px-4 py-2 bg-green-100 text-green-600 rounded-md" : "bg-yellow-100 text-yellow-800 rounded-md"}`}
                      >
                        {order?.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
    </>
  );
};

export default OrdersComponents;
