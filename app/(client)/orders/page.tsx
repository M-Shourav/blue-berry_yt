import Container from "@/components/Container";
import OrdersComponents from "@/components/OrdersComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/helpers";
import { auth } from "@clerk/nextjs/server";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const OrderPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);
  return (
    <div>
      <Container className="py-10">
        {orders?.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Order List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Order Number
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponents orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="pb-36 flex flex-col gap-y-2 items-center justify-center py-12 px-4">
              <FileX className="w-24 h-24 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900">
                No Orders Found
              </h2>
              <p className="text-sm text-center text-gray-600 max-w-md">
                It looks like you haven&apos;t place any orders yet. Start
                Shopping to see your orders here!{" "}
              </p>
              <Button>
                <Link href={"/"}>Browse Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrderPage;
