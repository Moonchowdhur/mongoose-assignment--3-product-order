import { z } from 'zod';

const variantSchema = z.object({
  type: z.string().optional(),
  value: z.string().optional(),
});

const inventorySchema = z.object({
  quantity: z.number().int().min(0).optional(),
  inStock: z.boolean().optional(),
});

const productZodForUpdationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(variantSchema).optional(),
  inventory: inventorySchema.optional(),
});

export default productZodForUpdationSchema;