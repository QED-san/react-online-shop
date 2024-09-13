import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Product from "../utils/types/Product";

const useProducts = () => {
  return useInfiniteQuery<Product.productsT[], Error>({
    queryKey: ["products"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      axios
        .get<Product.productsT[]>(
          `${
            import.meta.env.VITE_BASE_URL
          }/products?limit=10&offset=${pageParam}`
        )
        .then((res) => res.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 10 ? allPages.length + 10 : undefined;
    },
    refetchOnWindowFocus: false,
  });
};

export default useProducts;
