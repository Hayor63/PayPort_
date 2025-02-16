import { CreateCart } from "../../validationSchema/cart";
import CartModel, { Cart } from "../models/cart";

export default class cartRepo {
  static createCart: (Cart: CreateCart) => Promise<Cart> = async (Cart) => {
    const data = await CartModel.create(Cart);
    return data;
  };

  // Update Cart

  static updateCart: (
    id: string,
    updateParams: Partial<CreateCart>
  ) => Promise<any> = async (id, updateParams) => {
    return await CartModel.findByIdAndUpdate(id, updateParams, { new: true });
  };

  //delete cart
  static deleteCart: (cartid: string) => Promise<any> = async (cartid) => {
    const data = await CartModel.findByIdAndDelete(cartid);
    return data;
  };

  //get by Id
  static getById: (cartId: string) => Promise<Cart | null> = async (cartId) => {
    const data = await CartModel.findById(cartId);
    return data;
  };

  //get all Cart
  static getAllCart = async () => {
    const cart = await CartModel.find();
    return cart;
  };

  //Clear Cart
  static clearCart: (userId: string) => Promise<any> = async (userId) => {
    const data = await CartModel.deleteMany({ userId });
    return data;
  };
}
