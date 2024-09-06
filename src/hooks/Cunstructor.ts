import { getTokenReqT, updateUserReqT, userReqT } from "../utils/types/Auth";
import { UserT } from "../state management/User/UserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../state management/store";

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

export const UserUpdateCunstructor = (
  name: UserT["name"],
  email: UserT["email"],
  password: UserT["password"],
  avatar: UserT["avatar"],
  userState: UserT
) => {
  const output: Partial<updateUserReqT> = {};
  if (name.length > 0 && userState.name !== name) output.name = name;
  if (email.length > 0 && userState.email !== email) output.email = email;
  if (password.length >= 4 && userState.password !== password)
    output.password = password;
  if (avatar.length > 0 && userState.avatar !== avatar) output.avatar = avatar;
  return output;
};
