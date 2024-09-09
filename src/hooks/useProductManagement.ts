import { useMutation } from "@tanstack/react-query";
import {
  CreateProductReqT,
  CreateProductResT,
  DeleteProductReqT,
  DeleteProductResT,
  UpdateProductReqT,
} from "../utils/types/ProductManagement";
import axios from "axios";
import { ProductUpdateCunstructor } from "./Cunstructor";

export const useCreateProduct = (setRes: (res: CreateProductResT) => void) => {
  return useMutation<CreateProductResT, Error, CreateProductReqT>({
    mutationFn: async (req: CreateProductReqT) =>
      await axios
        .post<CreateProductResT>(
          `${import.meta.env.VITE_BASE_URL}/products`,
          req
        )
        .then((res) => res.data),
    onSuccess: (res) => setRes(res),
    onError: (err) =>
      console.error("while creating product, this happend:", err),
  });
};

export const useDeleteProduct = (setRes: (res: DeleteProductResT) => void) => {
  return useMutation<DeleteProductResT, Error, DeleteProductReqT>({
    mutationFn: async (id: DeleteProductReqT) =>
      await axios
        .delete<DeleteProductResT>(
          `${import.meta.env.VITE_BASE_URL}/products/${id}`
        )
        .then((res) => res.data),
    onSuccess: (res) => setRes(res),
    onError: (err) =>
      console.error("while deleting product, this happend:", err),
  });
};

export const useUpdateProduct = (setRes: (res: CreateProductResT) => void) => {
  return useMutation<CreateProductResT, Error, UpdateProductReqT>({
    mutationFn: async (req: UpdateProductReqT) =>
      await axios
        .put<CreateProductResT>(
          `${import.meta.env.VITE_BASE_URL}/products/${req.id}`,
          ProductUpdateCunstructor(req.updatedProduct)
        )
        .then((res) => res.data),
    onSuccess: (res) => setRes(res),
    onError: (err) =>
      console.error("while updating product, this happend:", err),
  });
};
