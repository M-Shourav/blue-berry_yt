import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}
const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[500px]">
        <DialogHeader>
          <DialogTitle className="w-full text-base">
            Order Details - {order?.orderNumber}
          </DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Customer:</strong> {order?.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order?.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order?.orderDate &&
              new Date(order?.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>
            {order?.status}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-x-1">
                  {product?.product?.image && (
                    <Image
                      src={urlFor(product?.product?.image).url()}
                      alt="product-image"
                      width={50}
                      height={50}
                      className="border rounded-md"
                    />
                  )}
                  {product?.product?.name}
                </TableCell>
                <TableCell className="text-center">
                  {product?.quantity}
                </TableCell>
                <TableCell>
                  <PriceFormatter amount={product?.product?.price} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          className="flex items-center justify-end gap-2 text-right border-t
        border-t-gray-300"
        >
          <strong>Total:</strong>
          <PriceFormatter amount={order?.totalPrice} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
