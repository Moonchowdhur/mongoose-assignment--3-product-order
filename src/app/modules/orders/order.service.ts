import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderIntoDb = async (order: TOrder) => {
    const result = await Order.create(order);
    return result;
  };

const getAllOrderFromDb = async (query:any) => {
 
  const result = await Order.find(query);
  return result;
};

export const OrderService={
    createOrderIntoDb,
    getAllOrderFromDb
} 