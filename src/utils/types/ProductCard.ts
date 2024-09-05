import { productsT } from "./Product";

export interface productCardT extends React.PropsWithChildren {
  product: productsT;
}

type idT = productsT["id"];
export type productCardImageT = { src: productsT["images"]; id: idT };

export type productCardTitleT = { title: productsT["title"] };

export type productCardDescriptionT = {
  description: productsT["description"];
  id: idT;
};

export type productCardCategoryT = { category: productsT["category"] };

export type productCardPurchaseInfoT = {
  price: productsT["price"];
  id: idT;
};
