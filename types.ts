export enum ProductCategory {
  CONTROLLERS = 'Controllers',
  MIXERS = 'Mixers',
  CUSTOM = 'Custom',
  ACCESSORIES = 'Accessories'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  specs: string[];
  // In a real app, this would be the GLB URL. 
  // For this demo, it determines the procedural shape.
  modelType: 'knob' | 'fader' | 'pad' | 'keys';
  modelPath: string;
  scale?: number;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}