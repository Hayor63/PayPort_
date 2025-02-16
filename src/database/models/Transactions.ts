import {
  getModelForClass,
  prop,
  Ref,
  modelOptions,
  pre,
  Severity,
} from "@typegoose/typegoose";
import { User } from "./user";
import OrderModel, { Order } from "./order";
import { bill } from "./bill";

@pre<Transaction>("save", async function (next) {
  if (this.amount === undefined) { // Only set amount if it's not already provided
    const order = await OrderModel.findById(this.orderId);
    if (order && order.totalbill !== undefined) {
      this.amount = order.totalbill;
    } else {
      throw new Error("Order not found or totalbill is undefined");
    }
  }
  next();
})


@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
  export class Transaction {

    @prop({ ref: () => User, required: true })
    userId!: Ref<User>;
  
    @prop({ ref: () => Order, required: true })
    orderId!: Ref<Order>;
  
    @prop({ required: true, min: 0 })
    amount!: number;
  
    @prop({ ref: () => bill, required: true })
    billId!: Ref<bill>;
  
    @prop({
      required: true,
      enum: ["pending", "completed", "failed"], 
      default: "pending",
    })
    status!: "pending" | "completed" | "failed";
  }

const TransactionModel = getModelForClass(Transaction);
export default TransactionModel;
