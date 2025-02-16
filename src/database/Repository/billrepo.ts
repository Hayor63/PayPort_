import { createbill } from "../../validationSchema/bill";
import billModel, { bill } from "../models/bill";

export default class billrepo {
  static createbill: (Cart: createbill) => Promise<bill> = async (bill) => {
    const data = await billModel.create(bill);
    return data;
  };

  //Delete billing info

  static deleteBill: (billingId: string) => Promise<any> = async (
    billingId
  ) => {
    const data = await billModel.findByIdAndDelete(billingId);
    return data;
  };

  //update billing
  static updateBilling: (
    id: string,
    updateParams: Partial<createbill>
  ) => Promise<any> = async (id, updateParams) => {
    return await billModel.findByIdAndUpdate(id, updateParams, { new: true });
  };
}
