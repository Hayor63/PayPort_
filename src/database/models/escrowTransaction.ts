import { User } from "./user"; 
import {
    getModelForClass,
    prop,
    Ref,
    Severity,
    ModelOptions,
  } from "@typegoose/typegoose";
  import { Transaction } from "./Transactions"; 

  @ModelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })

  export class EscrowTransaction {
    @prop() 
    id!: string; 
    @prop({ ref: () => User, required: true })
    buyerId!: Ref<User>;
  
    @prop({ ref: () => User, required: true })
    sellerId!: Ref<User>;
  
    @prop({ required: true })
    amount!: number;
  
    @prop({
      required: true,
      enum: ['held', 'released'], 
      default: 'held', 
    })
    status!: string;

    @prop({ required: true })
    buyerEmail!: string; 
  }
  
const EscrowTransactionModel = getModelForClass(EscrowTransaction);
export default EscrowTransactionModel;
 