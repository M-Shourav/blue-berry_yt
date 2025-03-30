import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import PriceView from "@/components/PriceView";
import { getProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { LuSquarePlus, LuStar } from "react-icons/lu";
import { MdQuestionMark } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShareSocialOutline } from "react-icons/io5";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return (
    <div>
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {product?.image && (
          <div
            className="w-full md:w-1/2 border border-blue-300 rounded-md
            group overflow-hidden shadow-md h-auto"
          >
            <Image
              src={urlFor(product?.image).url()}
              alt="productImage"
              width={700}
              height={700}
              loading="lazy"
              className="w-full max-h-[550px] object-cover group-hover:scale-110 duration-300
               ease-in-out overflow-hidden"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <div className="flex flex-col gap-y-2">
            <p className="text-2xl md:text-4xl font-semibold">
              {product?.name}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const isLastStar = index == 4;
                  return (
                    <LuStar
                      key={index}
                      fill={`${!isLastStar ? "#fca99b" : "transparent"}`}
                      className={`${isLastStar ? "text-gray-400" : "text-orange-500"}`}
                    />
                  );
                })}
              </div>
              <p className="text-sm text-gray-500">{`(25 reviews)`}</p>
            </div>
          </div>
          <PriceView
            price={product?.price}
            discount={product?.discountPrice}
            label={product?.label}
            className="text-xl mt-4"
          />
          {product?.stock && (
            <span className="text-base font-semibold w-fit px-4 py-2 rounded-md bg-green-100 text-green-800 my-2">
              In Stoke
            </span>
          )}
          <p className="text-base text-gray-800 my-1">
            <span className="px-2 py-2 bg-black text-white rounded-md">20</span>{" "}
            People are viewing this right now{" "}
          </p>
          <h3 className="text-base font-medium mb-2">{product?.description}</h3>
          {product && <AddToCartButton product={product} />}

          <div
            className="mt-2 w-full flex flex-wrap items-center justify-between gap-2.5
               border-b border-gray-300 py-5"
          >
            <div className="flex items-center gap-2 text-base hover:text-red-500 cursor-pointer duration-300">
              <LuSquarePlus className="text-xl" />
              <p>Compare color</p>
            </div>
            <div className="flex items-center gap-2 text-base hover:text-red-500 cursor-pointer duration-300">
              <MdQuestionMark />
              <p>Ask a question</p>
            </div>
            <div className="flex items-center gap-2 text-base hover:text-red-500 cursor-pointer duration-300">
              <TbTruckDelivery />
              <p>Delivery & Return</p>
            </div>
            <div className="flex items-center gap-2 text-base hover:text-red-500 cursor-pointer duration-300">
              <IoShareSocialOutline />
              <p>Share</p>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2.5 py-5">
            <div
              className="w-full md:w-1/2 border border-gray-400 flex flex-col py-4
                 items-center justify-center rounded-md hover:border-blue-400 cursor-pointer"
            >
              <h1 className="text-lg font-semibold">Free Shipping</h1>
              <p className="text-base text-muted-foreground">
                Free shipping over order $120
              </p>
            </div>
            <div
              className="w-full md:w-1/2 border border-gray-400 flex flex-col py-4
                 items-center justify-center rounded-md hover:border-blue-400 cursor-pointer"
            >
              <h1 className="text-lg font-semibold">Flexible Payment</h1>
              <p className="text-base text-muted-foreground">
                Pay with Multiple Credit Cards
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
