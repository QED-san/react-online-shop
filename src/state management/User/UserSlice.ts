import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserT = {
  id: number;
  name: string;
  role: "customer" | "admin";
  email: string;
  password: string;
  avatar: string;
};

export type tokensT = {
  access_token: string;
  refresh_token: string;
};

const initialState: UserT = {
  id: 0,
  name: "",
  role: "customer",
  email: "",
  password: "",
  avatar: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    authenticateUser: (state, action: PayloadAction<UserT>) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email,
        password: action.payload.password,
        avatar: action.payload.avatar,
      };
    },
    updateUser: (state, action: PayloadAction<UserT>) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email,
        password: action.payload.password,
        avatar: action.payload.avatar,
      };
    },
    logOutUser: () => {
      return initialState;
    },
  },
});

export const { authenticateUser, updateUser, logOutUser } = UserSlice.actions;
export default UserSlice.reducer;
