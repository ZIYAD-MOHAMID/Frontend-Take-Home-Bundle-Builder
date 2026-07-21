export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  price: number | string;
  compareAtPrice?: number | string;
  image?: string; 
}

export interface Step {
  id: string;
  title: string;
  icon?: string;
  products: Product[];
}

export interface Product {
  id: string;
  stepId: string;
  title: string;
  description: string;
  image: string;
  discountBadge?: string;
  variants: ProductVariant[];
}

export interface SystemConfig {
  activeStep?: string;
  quantities: Record<string, Record<string, number>>;
  selectedVariants: Record<string, string>;
}

export interface BuilderData {
  steps: Step[];
  initialState: SystemConfig;
}
