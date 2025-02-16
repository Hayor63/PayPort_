import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    Severity,
  } from "@typegoose/typegoose";
 
 import {User} from "./user";

 @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  export class bill{
    @prop({required: true , ref:()=> User })
    userId!: Ref<User>;
    @prop({required:true})
    address!: string;
    @prop({reuqired: true})
    zipcode!: number;
    @prop({required:true})
    postalcode!: number;
 }
 const billModel = getModelForClass(bill);
export default billModel;
