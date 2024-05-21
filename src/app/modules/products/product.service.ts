import mongoose from 'mongoose';
import { TProduct, TProductOptinal } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};



//with search term
const getAllProductFromDb = async (searchTerm:string) => {
  const regex = new RegExp(searchTerm, 'i'); 


 
const result = await Product.find({
  $or: [
    { name: regex  },
    { description: regex },
    { category: regex }
  ]
});
return result;
};

const getProductByIdFromDb = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductByIDFromDb = async (productId:string, updatedData:TProductOptinal) => {
    console.log(productId, updatedData);

    const result = await Product.updateOne({ _id: new mongoose.Types.ObjectId(productId) }, updatedData);

    return result;
  };

//   delete product
const deleteProductByIDFromDb = async (id:string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};




export const ProductService = {
  createProductIntoDb,
  getAllProductFromDb,
  getProductByIdFromDb,
  deleteProductByIDFromDb,
  updateProductByIDFromDb,

};
