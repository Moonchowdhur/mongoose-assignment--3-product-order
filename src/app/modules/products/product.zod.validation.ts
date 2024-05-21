import { z } from 'zod';

const variantSchema = z.object({
  type: z.string(),
  value: z.string()
});

const inventorySchema = z.object({
  quantity: z.number().int().min(0),
  inStock: z.boolean()
});

 const productZodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema
});


export default productZodSchema