import { useSelector } from "react-redux";
import { RootState } from "../state management/store";
import { productsT } from "../utils/types/Product";
import axios from "axios";
import React from "react";
import { fetchCartProductT } from "../utils/types/CartProducts";

const useCartProducts = () => {
  const cart = useSelector((state: RootState) => state.Cart);
  const [Products, setProducts] = React.useState<fetchCartProductT[]>([]);

  async function FetchProductById(id: number, qntt: number) {
    const res = await axios.get<productsT>(
      `${import.meta.env.VITE_BASE_URL}/products/${id}`
    );
    if (res.status <= 202) {
      const concatenatedRes = {
        ...res.data,
        qntt: qntt,
      };
      return concatenatedRes;
    } else
      return {
        qntt: 99,
        id: 9999999,
        title: "placeholder",
        price: 9999,
        description: "placeholder",
        category: {
          id: 999999,
          name: "placeholder category",
          image: "placeholder",
        },
        images: ["placeholder 0", "placeholder 1", "placeholder 2"],
      };
  }

  React.useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = cart.map((item) =>
        FetchProductById(item.id, item.qntt)
      );
      const resolvedProducts = await Promise.all(productPromises);
      if (resolvedProducts) setProducts(resolvedProducts);
    };
    fetchProducts();
  }, [cart]);

  if (cart.length > 0) return Products;
  else return null;
};

export default useCartProducts;
