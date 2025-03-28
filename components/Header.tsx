import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/images";
import Form from "next/form";
import { ShoppingBasket, User } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import CartIcon from "./CartIcon";
import { getMyOrders } from "@/sanity/helpers";
const Header = async () => {
  const user = await currentUser();
  let orders = null;
  if (user?.id) {
    orders = await getMyOrders(user?.id);
  }

  return (
    <header
      className="w-full bg-white py-4 border-b border-b-gray-300
     sticky top-0 z-50"
    >
      <Container className="flex flex-wrap items-center justify-between gap-7">
        <Link href={"/"}>
          <Image src={logo} alt="logo" priority className="w-24 object-cover" />
        </Link>
        <Form action="/search" className="flex-1">
          <input
            type="text"
            name="query"
            placeholder="search name of products..."
            className="w-full px-4 py-2  border border-gray-300 outline-none rounded-md focus-visible:border-blue-400"
          />
        </Form>
        <div className="flex items-center gap-2">
          <CartIcon />
          <SignedIn>
            <Link
              href={"/orders"}
              className="flex items-center gap-2 px-2 py-1 shadow-md
           hover:shadow-none ring-1 ring-gray-100 rounded-sm duration-300"
            >
              <ShoppingBasket className="w-6 h-6 text-blue-400" />
              <div className="flex flex-col">
                <p className="text-xs font-semibold flex items-center gap-x-1">
                  <span>
                    {orders && orders?.length > 0 ? orders?.length : 0}
                  </span>
                  items
                </p>
                <p className="text-sm font-semibold">Orders</p>
              </div>
            </Link>
          </SignedIn>
          {user ? (
            <div
              className="flex items-center gap-2 px-2 py-1 shadow-md
          hover:shadow-none ring-1 ring-gray-100 rounded-sm duration-300"
            >
              <UserButton />
              <div className="hidden md:inline-flex flex-col ">
                <p className="text-xs font-semibold">welcome backs</p>
                <p className="text-sm font-semibold">{user?.fullName}</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <div
                className="flex items-center gap-2 px-2 py-1 shadow-md group cursor-pointer
          hover:shadow-none ring-1 ring-gray-100 rounded-sm duration-300 "
              >
                <User className="w-6 h-6 text-blue-400" />
                <div className="flex flex-col">
                  <p className="text-xs font-semibold">account</p>
                  <p className="text-sm font-semibold">Login</p>
                </div>
              </div>
            </SignInButton>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
