import { object, optional, string,number, array, TypeOf,boolean,z } from "zod"

export const EscrowTransactionSchema = z.object({
  body: z.object({
    buyerId: z.string({ required_error: "buyerId is required" }),
    sellerId: z.string({ required_error: "sellerId is required" }),
    amount: z.number({ required_error: "Amount is required" }).positive("Amount must be positive"),
    status: z.enum(["held", "released"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be either 'held' or 'released'",
    }).optional(),
    buyerEmail: z.string({ required_error: "buyerEmail is required" }).email("Invalid email"),
  }),
});

export const verifyPaymentTransactionSchema = object({
  query: object({
    reference: string({ required_error: "Payment reference is required" }), // Paystack's unique payment reference
  }),
});



export const ReleaseEscrowTransactionSchema = object({
  body: object({
    id: string({ required_error: "Transaction ID is required" }), // This is the escrow transaction ID
    confirmation: boolean({ required_error: "Confirmation is required" }), // Must be a boolean
  }),
});

export type CreateEscrowTransaction  = TypeOf < typeof EscrowTransactionSchema> ["body"]
export type verifyPaymentTransaction   = TypeOf < typeof verifyPaymentTransactionSchema > ["query"]
export type ReleaseEscrowTransaction  = TypeOf < typeof ReleaseEscrowTransactionSchema> ["body"]