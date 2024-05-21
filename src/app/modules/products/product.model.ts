import {  Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
    type: {
      type: String,
      required: [true, 'Type is required']
    },
    value: {
      type: String,
      required: [true, 'Value is required']
    }
  });
  
  const inventorySchema = new Schema<TInventory>({
    quantity: {
      type: Number,
      required: [true, 'Quantity is required']
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock is required']
    }
  });
  
  const productSchema = new Schema<TProduct>({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required']
    },
    variants: {
      type: [variantSchema],
      required: [true, 'Variants are required']
    },
    inventory: {
      type: inventorySchema,
      required: [true, 'Inventory is required']
    }
  });


  export const Product = model<TProduct>('Product', productSchema);

