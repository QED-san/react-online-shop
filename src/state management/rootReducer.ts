import { combineReducers } from "redux";
import CartSlice from "./Cart/CartSlice";
import ThemeSlice from "./Theme/ThemeSlice";
import OrderSlice from "./Orders/OrderSlice";
import UserSlice from "./User/UserSlice";

const rootReducer = combineReducers({
  Cart: CartSlice,
  Theme: ThemeSlice,
  Order: OrderSlice,
  User: UserSlice,
});

export default rootReducer;
