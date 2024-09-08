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

export type CreateProductReqT = Omit<productsT, "id">;

export type UpdateProductReqT = {
  id: DeleteProductReqT;
  updatedProduct: Partial<CreateProductReqT>;
};

export interface DeleteProductInputT {
  id: number;
}

export interface CreateProductInputsT {
  title: string;
  price: number;
  description: string;
  image: Blob;
  categoryId: number | null;
}

export interface UpdateProductInputsT
  extends CreateProductInputsT,
    DeleteProductInputT {}
