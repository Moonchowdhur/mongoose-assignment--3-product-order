import { Request, Response } from 'express';
import orderZodSchema from './order.zod.validation';
import { OrderService } from './order.service';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';

// create order
// const createOrder = async (req: Request, res: Response) => {
//     try {
//       const orderData = req.body;

//       const zodParseData = orderZodSchema.parse(orderData);

//       console.log(zodParseData);

//       const result = await OrderService.createOrderIntoDb(zodParseData);

//       res.status(200).json({
//         success: true,
//         message: 'Order created successfully!',
//         data: result,
//       });
//     } catch (error: any) {
//       console.log(error.message, 'error');
//       res.status(400).json({
//         success: false,
//         message: 'Wrong input',
//         error: error,
//       });
//     }
//   };

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const { productId, quantity } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product?._id) {
      return res.status(400).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Update the inventory
    product.inventory.quantity = product.inventory.quantity - quantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    } else {
      product.inventory.inStock = true;
    }

    const result1 = await ProductService.updateProductByIDFromDb(
      productId,
      product,
    );

    console.log(result1);
    const zodParseData = orderZodSchema.parse(orderData);

    const result = await OrderService.createOrderIntoDb(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

// get all order
// const getAllOrder = async (req: Request, res: Response) => {

//   try {
//     const {email} = req.query;
//     let result;

//     if (email) {
//       result = await OrderService.getAllOrderFromDb({ email });
//       res.status(200).json({
//         success: true,
//         message: 'Orders fetched successfully for user email!',
//         data: result,
//       });
//     } else {
//       result = await OrderService.getAllOrderFromDb({});
//       res.status(200).json({
//         success: true,
//         message: 'Orders fetched successfully!',
//         data: result,
//       });
//     }

//     } catch (error) {

//       res.status(400).json({
//         success: false,
//         message: 'No Order found',
//         error: error,
//       });
//     }
//   };

// working
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let result;

    if (email) {
      result = await OrderService.getAllOrderFromDb({ email });

      if (result.length === 0) {
        console.log(email, result, 'email');
        res.status(400).json({
          success: false,
          message: 'Order not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        });
      }
    } else {
      result = await OrderService.getAllOrderFromDb({});
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    console.log(error.message, 'error');
    res.status(400).json({
      success: false,
      message: 'No data found',
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
