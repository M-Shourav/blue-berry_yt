import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { getSearchProductQuery } from "@/sanity/helpers";
import { FcSearch } from "react-icons/fc";
interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPage = async ({ searchParams }: Props) => {
  const { query } = searchParams;
  const product = await getSearchProductQuery(query);
  return (
    <Container className="py-10">
      {product?.length ? (
        <ProductGrid product={product} />
      ) : (
        <div className="flex items-center justify-center min-h-screen py-0">
          <div className="flex flex-col items-center">
            <FcSearch className="text-5xl" />
            <h1 className="text-lg font-semibold">
              Oops! No product found for <span>{query}</span>
            </h1>
            <p className="text-[15px] text-muted-foreground">
              Sorry, we could not find what you are looking for Try a different
              keyword
            </p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
