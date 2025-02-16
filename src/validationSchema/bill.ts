import { object, string, number, array, z, TypeOf } from "zod";

export const billSchema = object({
  body: object({
    userId: string({ required_error: " userId is required" }),
    address: string({
      required_error: "address is required",
    }),
    zipcode: number({ required_error: "number is required" }).positive(
      "zipcode must be positive"
    ),
    postalcode: number({
      required_error: "postalcode is required",
    }).positive("postalcode must be positive"),
  }),
});

//update Bill

export const updateBillSchema = object({
  params: object({
    id: string({
      required_error: "Billing Id is required",
    }),
  }),

  body: object({
    userId: string({
      required_error: "User Id is required",
    }),

    address: string({
      required_error: "Address is required",
    }),

    zipcode: number({
      required_error: "Zip Code is required",
    }),

    postalcode: number({
      required_error: "Postal Code is required",
    }),
  }),
});

//delete bill
export const deleteBillSchema = object({
  params: object({
    id: string({
      required_error: "Billing ID is required",
    }),
  }),
});

export type createbill = z.infer<typeof billSchema>["body"];
export type updateBillInfo = {
  params: TypeOf<typeof updateBillSchema>["params"];
  body: TypeOf<typeof updateBillSchema>["body"];
};
export type deleteBill = TypeOf<
  typeof deleteBillSchema
>["params"];