import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemT } from "../Cart/CartSlice";

export type DateT = string;
export type PaymentTypeT = "inPerson" | "online";
export type PurchaseMethodT = "nearbyShop" | "online";
export type OrderItemT = CartItemT & { creationDate?: DateT; price: number };
export type OrderT = {
  id: number;
  creationDate: DateT;
  deliveryDate: DateT;
  paymentType: PaymentTypeT;
  purchaseMethod: PurchaseMethodT;
  items: OrderItemT[];
};

const initialState: OrderT[] = [];

const OrderSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderT>) => {
      return [...state, action.payload];
    },
    resetOrderState: () => {
      return initialState;
    },
  },
});

export const { addOrder, resetOrderState } = OrderSlice.actions;
export default OrderSlice.reducer;
