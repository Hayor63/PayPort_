import {
  getModelForClass,
  prop,
  Ref,
  modelOptions,
  pre,
  Severity,
} from "@typegoose/typegoose";
import { Cart } from "./cart";
import { User } from "./user";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Order>("save", async function (next) {
  if (!this.isModified("cartId")) return next(); // Only run if cartId is modified

  await this.populate("cartId"); // Populate cartId before calculation

  // Ensure cartId is treated as an array (even though it's a single reference)
  const cartArray = Array.isArray(this.cartId) ? this.cartId : [this.cartId];

  // Calculate totalbill by summing the total from the cart(s)
  this.totalbill = cartArray.reduce((total, cartItem: any) => {
    const orderTotal = Number(cartItem?.total) || 0; 
    return total + orderTotal;
  }, 0);

  // Adjust the totalbill with deliveryFee and coupon
  this.totalbill = (this.totalbill || 0) + this.deliveryFee - (this.coupon || 0);
  next();
})
export class Order {
  @prop({ required: true, ref: () => User })
  userId!: Ref<User>;

  @prop({ required: true, ref: () => Cart })
  cartId!: Ref<Cart>;

  // Add totalbill property to store the computed total.
  @prop()
  totalbill?: number;

  @prop({ required: true })
  deliveryFee!: number;

  @prop({ required: true })
  currency!: string;

  @prop({ required: true })
  paymentref!: string;

  @prop()
  coupon?: number; // coupon is optional; if not provided, default to 0 during calculation
}

const OrderModel = getModelForClass(Order);
export default OrderModel;
