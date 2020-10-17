export interface ImageI {
  asset: {
    fluid: {
      aspectRatio: number;
      base64: string;
      sizes: string;
      src: string;
      srcSet: string;
      srcSetWebp: string;
      srcWebp: string;
    };
    fixed?: {
      width: number;
      height: number;
      base64: string;
      src: string;
      srcSet: string;
      srcSetWebp: string;
      srcWebp: string;
    };
  };
}
export type Topping = { name: string; id: string };

export interface PizzaI {
  id: string;
  name: string;
  price: number;
  image: ImageI;
  slug: {
    current: string;
  };
  toppings: [Topping];
}

export interface PersonI {
  id: string;
  name: string;
  image: ImageI;
  slug: {
    current: string;
  };
  description: string;
}

export interface BeerI {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: { average: number; reviews: number };
}

export interface Order {
  id: string;
  size: string;
}

export interface SanityData {
  name: string;
  _id: string;
  image: {
    asset: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
}
