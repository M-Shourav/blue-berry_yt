import Container from "@/components/Container";
import { getMyOrders } from "@/sanity/helpers";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OrderPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const order = await getMyOrders(userId);
  return (
    <div>
      <Container className="py-10">OrderPage</Container>
    </div>
  );
};

export default OrderPage;
