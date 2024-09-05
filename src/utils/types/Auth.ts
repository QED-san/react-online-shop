import { UserT } from "../../state management/User/UserSlice";

export type checkEmailResT = { isAvailable: boolean };
export type fileUploadResT = {
  originalname: string;
  filename: string;
  location: string;
};
export type getTokenReqT = {
  email: UserT["email"];
  password: UserT["password"];
};
export type fileUploadReqT = Blob;
export type userReqT = Omit<UserT, "id">;
