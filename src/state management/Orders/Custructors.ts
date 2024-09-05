import {
  OrderItemT,
  OrderT,
  PaymentTypeT,
  DateT,
  PurchaseMethodT,
} from "./OrderSlice";

export const OrderItemReducerCunstructor = (
  id: number,
  qntt: number,
  price: number
): OrderItemT => {
  return {
    id,
    qntt,
    creationDate: new Date().toDateString(),
    price,
  };
};

export const OrderReucerCunstructor = (
  details: {
    paymentType: PaymentTypeT;
    deliveryDate: DateT;
    purchaseMethod: PurchaseMethodT;
  },
  items: OrderItemT[]
): OrderT => {
  const autoPlusTenDaysFromNow = new Date();
  autoPlusTenDaysFromNow.setDate(autoPlusTenDaysFromNow.getDate() + 10);
  return {
    id: Math.random(),
    creationDate: new Date().toDateString(),
    deliveryDate: details.deliveryDate
      ? details.deliveryDate
      : autoPlusTenDaysFromNow.toDateString(),
    paymentType: details.paymentType,
    purchaseMethod: details.purchaseMethod,
    items,
  };
};
