import { productCategoryT } from "./Product";

export type CreateCategoryReqT = Omit<productCategoryT, "id">;

export type DeleteCategoryReqT = number;
export type DeleteCategoryResT = boolean;
export type UpdateCategoryObjT = Partial<CreateCategoryReqT>;
export type UpdateCategoryReqT = {
  id: DeleteCategoryReqT;
  updatedCategory: UpdateCategoryObjT;
};

export type CreateCategoryInputT = CreateCategoryReqT;
export type DeleteCategoryInputT = Omit<UpdateCategoryReqT, "updatedCategory">;
export type UpdateCategoryInputT = DeleteCategoryInputT &
  Pick<CreateCategoryInputT, "name">;
export type UpdateCategoryFormData = UpdateCategoryInputT & {
  images: string[];
};
