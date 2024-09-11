import { DeleteCategoryReqT, DeleteCategoryResT } from "./CategoryManagement";
import { productCategoryT, productsT } from "./Product";

export interface IncludedTypes {
  creationAt: string;
  updatedAt: string;
}

export type DeleteProductReqT = DeleteCategoryReqT;
export type DeleteProductResT = DeleteCategoryResT;

export interface NewTypesIncludedProductCategory
  extends productCategoryT,
    IncludedTypes {}

export interface CreateProductResT
  extends Omit<productsT, "category">,
    IncludedTypes {
  category: NewTypesIncludedProductCategory;
}

export type ProductTWithoutId = Omit<productsT, "id">;
export type ProductWithoutCategoryAndId = Omit<ProductTWithoutId, "category">;

export type CreateProductReqT = ProductWithoutCategoryAndId;

export type UpdateProductReqT = {
  id: DeleteProductReqT;
  updatedProduct: CreateProductReqT;
};

export type UpdateProductResT = CreateProductResT;

export type DeleteProductInputT = Pick<UpdateProductReqT, "id">;

export interface CreateProductInputsT {
  title: string;
  price: number;
  description: string;
  categoryId: number;
}

export interface UpdateProductInputsT
  extends CreateProductInputsT,
    DeleteProductInputT {}

export type UpdateProductFormData = UpdateProductInputsT & {
  images: productsT["images"];
};
