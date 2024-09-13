import { UserT } from "../../state management/User/UserSlice";

export type LoginUserInputsT = Pick<UserT, "email" | "password">;
