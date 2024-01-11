export interface Product {
  name: string;
  price: string;
  category: string;
  description: string;
  options: string;
}

export interface RequestProduct {
  name: string;
  price: string;
  category: string;
  description: string;
  options: string[];
  url: string;
}

export interface ResponseProduct {
  name: string;
  price: string;
  category: string;
  description: string;
  options: string[];
  productId: string;
  url: string;
}
