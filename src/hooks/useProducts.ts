import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Product from "../utils/types/Product";

const useProducts = () => {
  return useQuery<Product.productsT[], Error>({
    queryKey: ["products"],
    queryFn: () =>
      axios
        .get<Product.productsT[]>(`${import.meta.env.VITE_BASE_URL}/products`)
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export default useProducts;
