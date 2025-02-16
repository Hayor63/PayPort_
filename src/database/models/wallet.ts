import { getModelForClass, prop, Ref, modelOptions, Severity } from "@typegoose/typegoose";
import { User } from "./user";
import { Transaction } from "./Transactions";

@modelOptions({
  schemaOptions: {
    timestamps: true, 
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Wallet {
  @prop({ required: true, ref: () => User })  
  userId!: Ref<User>;

  @prop({ required: true, unique: true })  
  walletAddress!: string;

  @prop({ required: true, min: 0 })
  amount!: number;  

  @prop({ required: true, min: 0 })
  balance!: number; 

  @prop({ required: true, min: 0 })
  ledgerBalance!: number;  

  @prop({ ref: () => Transaction, default: [], required: true })
  transactionHistory!: Ref<Transaction>[];  
}

const WalletModel = getModelForClass(Wallet);
export default WalletModel;
