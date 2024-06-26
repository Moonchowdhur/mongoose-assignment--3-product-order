import mongoose, { Schema, model } from 'mongoose';

import { TOrder } from './order.interface';



const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true
  },

  // @ts-ignore 
  productId: {
    type: mongoose.Schema.ObjectId ,
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

