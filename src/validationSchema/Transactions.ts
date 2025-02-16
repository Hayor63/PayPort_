import { object, string, number, array, TypeOf, boolean, z } from "zod";

export const TransactionSchema = z.object({
  body: object({
    userId: string({ required_error: "userId is required" }),
    status: z.enum(["pending", "completed", "failed"], {
      required_error: "Status is required",
    }),
    orderId: string({ required_error: "orderId is required" }),
    billId: string({ required_error: "billId is required" }),
  }),
});

//update Transaction
export const updateTransactionSchema = object({
  params: object({
    id: string({
      required_error: "Transaction ID is required",
    }),
  }),
  body: object({
    userId: string({ required_error: "userId is required" }),
    status: z.enum(["pending", "completed", "failed"], {
      required_error: "Status is required",
    }),
    orderId: string({ required_error: "orderId is required" }),
    billId: string({ required_error: "billId is required" }),
  }),
});

//delete Transaction
export const deleteTransactionSchema = object({
  params: object({
    id: string({
      required_error: "Transaction ID is required",
    }),
  }),
});

// getTransactionByIdSchema
export const getTransactionByIdSchema = object({
  params: object({
    id: string({
      required_error: "Transaction ID is required",
    }),
  }),
});

// getAllTransactionSchema
export const getAllTransactionSchema = object({});



export type CreateTransaction = TypeOf<typeof TransactionSchema>["body"];
export type deleteTransaction = TypeOf<
  typeof deleteTransactionSchema
>["params"];
export type updateTransaction = {
  params: TypeOf<typeof updateTransactionSchema>["params"];
  body: TypeOf<typeof updateTransactionSchema>["body"];
};
export type getAllTransaction = TypeOf<typeof getAllTransactionSchema>;
export type getSingleTransaction = TypeOf<
  typeof getTransactionByIdSchema
>["params"];

