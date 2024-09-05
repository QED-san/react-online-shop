export type productCategoryT = {
  id: number;
  name: string;
  image: string;
};

export type productsT = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: productCategoryT;
  images: string[];
};