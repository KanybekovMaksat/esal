import { z } from 'zod';
import { AdProduct, Product } from './product.contracts';

export type Product = z.infer<typeof Product>;
export type AdProduct = z.infer<typeof AdProduct>