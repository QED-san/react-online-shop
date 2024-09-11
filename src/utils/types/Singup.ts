import { UserT } from "../../state management/User/UserSlice";

export type RegisterUserInputsT = Pick<UserT, "name" | "email" | "password">;
