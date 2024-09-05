import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItemT = {
  id: number;
  qntt: number;
};

const initialState: CartItemT[] = [];

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.find((p) => p.id === action.payload.id)) {
        return [...state, { id: action.payload.id, qntt: 1 }];
      } else return state;
    },
    incrementCartItemQntt: (state, action: PayloadAction<{ id: number }>) => {
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, qntt: i.qntt + 1 } : i
      );
    },
    decrementCartItemQntt: (state, action: PayloadAction<{ id: number }>) => {
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, qntt: i.qntt - 1 } : i
      );
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const updatedState = state.filter((i) => i.id !== action.payload.id);
      if (updatedState.length === 0) {
        return initialState;
      }
      return updatedState;
    },
    resetCart: () => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  incrementCartItemQntt,
  decrementCartItemQntt,
  removeFromCart,
  resetCart,
} = CartSlice.actions;
export default CartSlice.reducer;
