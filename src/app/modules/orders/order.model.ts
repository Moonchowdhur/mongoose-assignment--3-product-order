import mongoose, { Schema, model } from 'mongoose';

import { TOrder } from './order.interface';
import { string } from 'zod';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    // match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  productId: {
    type: mongoose.Schema.ObjectId as string,
    ref: 'Product',
    required: true
  },
 
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const Order = model<TOrder>('Order', orderSchema);

