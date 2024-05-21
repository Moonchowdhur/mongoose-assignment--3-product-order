import {  TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderIntoDb = async (order: TOrder) => {
    const result = await Order.create(order);
    return result;
  };

// @ts-ignore 
const getAllOrderFromDb = async (query ) => {

  console.log(query,"q");
 
  const result = await Order.find(query);
  return result;
};

export const OrderService={
    createOrderIntoDb,
    getAllOrderFromDb
} 