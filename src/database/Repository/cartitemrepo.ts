import { PartialLoose } from "../../utils/helpers";
import {CreateCartitem } from "../../validationSchema/cartitem";
import CartItemModel from "../models/cartitem";
import cartitemModel, { CartItem } from "../models/cartitem";


class ProductExtend extends CartItem {
  createdAt: string;
}
type SortLogic = PartialLoose<ProductExtend, "asc" | "desc" | 1 | -1>;
export interface PaginatedFetchParams {
  pageNumber: number;
  pageSize: number;
  filter: Record<string, any>;
  sortLogic: SortLogic;
  search: string;
  relatedCategories: string[];
}
export default class cartitemRepo{
    static CreateCartitem: (cartitem:CreateCartitem) => Promise<CartItem> =
      async (cartitem) => {
        const data = await cartitemModel.create(cartitem);
        return data;
      };
      

      static updateCartItem : (
        id : string,
        updateParams : Partial<CreateCartitem>
      ) => Promise<any> = async(id,updateParams) => {
        return await cartitemModel.findByIdAndUpdate(id, updateParams, {new : true})
      }


      static deleteCartItem : (cartItemId : string) => Promise<any> = async (
        cartItemId
      ) => {
        const data = await cartitemModel.findByIdAndDelete(cartItemId)
        return data
      }

      
    //get by Id
    static getById: (cartId: string) => Promise<any> = async (cartId) => {
      const data = await CartItemModel.findById(cartId);
      return data;
    };

    

      //get all Cart
      static getAllCartItem = async () => {
        const cart = await CartItemModel.find();
        return cart;
      };
    

  }
  