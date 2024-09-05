import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Product from "../utils/types/Product";

const useProduct = (id?: string) => {
  return useQuery<Product.productsT, Error>({
    queryKey: ["products", "product", id],
    queryFn: () =>
      axios
        .get<Product.productsT>(
          `${import.meta.env.VITE_BASE_URL}/products/${id}`
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export default useProduct;
