import { Request, Response } from 'express';
import productZodSchema from './product.zod.validation';
import { ProductService } from './product.service';
import productZodForUpdationSchema from './product.zod.optional';
import { TProductOptinal } from './product.interface';

// create prodcut
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const zodParseData = productZodSchema.parse(productData);

    console.log(zodParseData);

    const result = await ProductService.createProductIntoDb(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Wrong input',
      error: error,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  console.log(searchTerm);

  try {
    let query: any;
    let result;

    if (searchTerm) {
      query = searchTerm;
    }

    if (query) {
      result = await ProductService.getAllProductFromDb(query);
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } else {
      result = await ProductService.getAllProductFromDb({});
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'No data found',
      error: error,
    });
  }
};

//   get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductByIdFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'No data found',
      error: error,
    });
  }
};

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    console.log(productId, productData);

    // Validation product data with Zod schema
    let zodParseUpdationData;
    try {
      zodParseUpdationData = productZodForUpdationSchema.parse(productData);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: err,
      });
    }

    const result = await ProductService.updateProductByIDFromDb(
      productId,
      zodParseUpdationData as TProductOptinal,
    );

    console.log(result, 'result');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: zodParseUpdationData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Wrong input',
      error: error,
    });
  }
};

// delete product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    
    const result = await ProductService.deleteProductByIDFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'No data deleted',
      error: error,
    });
  }
};


export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
