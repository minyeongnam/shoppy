export interface Product {
  name: string;
  price: string;
  category: string;
  description: string;
  options: string;
}

export interface requestProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  options: string[];
  url: string;
}
