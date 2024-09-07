import { getTokenReqT, updateUserReqT, userReqT } from "../utils/types/Auth";
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

export type UpdateUserReqT = updateUserReqT & { userState: UserT };

export const UserUpdateCunstructor = (props: UpdateUserReqT) => {
  const output: Partial<updateUserReqT> = {};
  if (props.name.length > 0 && props.userState.name !== props.name)
    output.name = props.name;
  if (props.email.length > 0 && props.userState.email !== props.email)
    output.email = props.email;
  if (props.password.length >= 4 && props.userState.password !== props.password)
    output.password = props.password;
  if (props.avatar.length > 0) output.avatar = props.avatar;
  return output;
};
