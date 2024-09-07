import { useMutation } from "@tanstack/react-query";
import {
  CreateCategoryReqT,
  DeleteCategoryReqT,
  DeleteCategoryResT,
  UpdateCategoryReqT,
} from "../utils/types/CategoryManagement";
import axios from "axios";
import { productCategoryT } from "../utils/types/Product";

export const useCreateCategory = (setRes: (res: productCategoryT) => void) => {
  return useMutation<productCategoryT, Error, CreateCategoryReqT>({
    mutationFn: async (req: CreateCategoryReqT) =>
      await axios
        .post<productCategoryT>(
          `${import.meta.env.VITE_BASE_URL}/categories`,
          req
        )
        .then((res) => res.data),
    onSuccess: (res) => setRes(res),
    onError: (err) =>
      console.error("while creating category, this happend:", err),
  });
};

export const useDeleteCategory = (
  setRes: (res: DeleteCategoryResT) => void
) => {
  return useMutation<DeleteCategoryResT, Error, DeleteCategoryReqT>({
    mutationFn: async (id: DeleteCategoryReqT) =>
      await axios
        .delete<DeleteCategoryResT>(
          `${import.meta.env.VITE_BASE_URL}/categories/${id}`
        )
        .then((res) => res.data),
    onSuccess: (res) => setRes(res),
    onError: (err) =>
      console.error("while deleting category, this happend:", err),
  });
};

export const useUpdateCategory = (setRes: (res: productCategoryT) => void) => {
  return useMutation<productCategoryT, Error, UpdateCategoryReqT>({
    mutationFn: async (req: UpdateCategoryReqT) =>
      await axios
        .put<productCategoryT>(
          `${import.meta.env.VITE_BASE_URL}/categories/${req.id}`,
          req.updatedCategory
        )
        .then((res) => res.data),
    onSuccess: (res) => setRes(res),
    onError: (err) =>
      console.error("while updating category, this happend:", err),
  });
};
