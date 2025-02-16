import { formatResponseRecord } from "../../utils/formatter";
import { PartialLoose } from "../../utils/helpers";
import { CreateOrder } from "../../validationSchema/order";
import orderModel, { Order } from "../models/order";


class OrderExtend extends Order {
  createdAt: string;
}

type SortLogic = PartialLoose<OrderExtend, "asc" | "desc" | 1 | -1>;
const defaultSortLogic: SortLogic = { createdAt: -1 };
export interface PaginatedFetchParams {
  pageNumber: number;
  pageSize: number;
  filter: Record<string, any>;
  sortLogic: SortLogic;
  search: string;
}


export default class orderRepo {
  static CreateOrder: (Order: CreateOrder) => Promise<Order> = async (
    order
  ) => {
    const data = await orderModel.create(order);
    return data;
  };

  //delete order
  static deleteOrder: (orderId: string) => Promise<any> = async (orderId) => {
    const data = await orderModel.findByIdAndDelete(orderId);
    return data;
  };

   //update order
   static updateOrder: (
    id: string,
    updateParams: Partial<CreateOrder>
  ) => Promise<any> = async (id, updateParams) => {
    return await orderModel.findByIdAndUpdate(id, updateParams, { new: true });
  };


   //get by Id
   static getById: (orderId: string) => Promise<any> = async (orderId) => {
    const data = await orderModel.findById(orderId);
    return data;
  };

    //get all orders
    static getPaginatedOrder = async ({
      pageNumber = 1,
      pageSize = 10,
      filter: _filter,
      sortLogic = defaultSortLogic, // Use -1 for descending order
      search,
    }: Partial<PaginatedFetchParams>): Promise<Order[]> => {
      const filter = {
        ...(_filter || {}),
        ...(search ? { title: { $regex: search, $options: "i" } } : {}),
      };
  
      const orders = await orderModel.find(filter)
        .sort(sortLogic)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean()
        .exec();
  
      const formattedOrders: Order[] = orders.map((order) => {
        return {
          ...formatResponseRecord(order),
        };
      });
  
      return formattedOrders;
    };  

}
