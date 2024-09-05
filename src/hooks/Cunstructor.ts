import { getTokenReqT, userReqT } from "../utils/types/Auth";
import { UserT } from "../state management/User/UserSlice";

export const UserRegisterCunstructor = (
  name: UserT["name"],
  email: UserT["email"],
  password: UserT["password"],
  avatar: UserT["avatar"],
  role?: UserT["role"]
): userReqT => {
  return {
    name,
    role: role ? role : "customer",
    email,
    password,
    avatar,
  };
};

export const GetTokensCunstructor = (
  email: getTokenReqT["email"],
  password: getTokenReqT["password"]
): getTokenReqT => {
  return {
    email,
    password,
  };
};
