import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Product from "../utils/types/Product";

const useProducts = () => {
  return useQuery<Product.productCategoryT[], Error>({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get<Product.productCategoryT[]>(
          `${import.meta.env.VITE_BASE_URL}/categories`
        )
        .then((res) => res.data),
  });
};

export default useProducts;
