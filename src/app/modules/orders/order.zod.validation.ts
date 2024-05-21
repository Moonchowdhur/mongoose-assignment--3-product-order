import { z } from 'zod';

const orderZodSchema = z.object({
    email: z.string().email(),
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID'), 
    price: z.number().min(0),
    quantity: z.number().int().min(1)
  });


export default orderZodSchema



