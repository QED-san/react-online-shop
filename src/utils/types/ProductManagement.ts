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
  extends productsT,
    NewTypesIncludedProductCategory {
  category: NewTypesIncludedProductCategory;
}

export type ProductTWithoutId = Omit<productsT, "id">;

export type CreateProductReqT = Omit<ProductTWithoutId, "category"> & {
  categoryId: number;
};

export type UpdateProductReqT = {
  id: DeleteProductReqT;
  updatedProduct: Partial<CreateProductReqT>;
};

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

export type UpdateProductFormData = UpdateProductInputsT & { images: string[] };
