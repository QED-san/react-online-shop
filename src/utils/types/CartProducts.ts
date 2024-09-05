import { productsT } from "./Product";

export interface fetchCartProductT extends productsT {
  qntt: number;
}
