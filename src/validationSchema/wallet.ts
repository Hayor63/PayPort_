import { array, number, object, string, TypeOf, z } from "zod";

export const walletValidationSchema = z.object({
  body: object({
    userId: string({ required_error: "userId is required" }),
    walletAddress: string().nonempty("walletAddress is required"),
    amount: number().min(0, "Amount must be greater than or equal to 0"),
    balance: number().min(0, "Balance must be greater than or equal to 0"),
    ledgerBalance: number().min(
      0,
      "Ledger balance must be greater than or equal to 0"
    ),
  }),
});

// Get Wallet Balance Schema
export const GetWalletBalanceSchema = object({
  params: object({
    id: string().min(1, "Wallet ID is required"), // Ensures walletId is a non-empty string
  }),
});

// Deposit Funds Schema
export const DepositFundsSchema = object({
  body : object({
    walletId: string().min(1, "Wallet ID is required"),
    amount: number().positive("Deposit amount must be greater than zero"),
  })
   
});

// Wallet History Schema
export const WalletHistorySchema = object({
  params: object({
    walletId: string().min(1, "Wallet ID is required"), // Ensures walletId is a non-empty string
  }),
});

//delete Wallet
export const deleteWalletSchema = object({
  params: object({
    id: string({
      required_error: "Wallet ID is required",
    }),
  }),
});

// getWalletByIdSchema
export const getWalletByIdSchema = object({
  params: object({
    id: string({
      required_error: "Wallet ID is required",
    }),
  }),
});


// getAllWalletSchema
export const getAllWalletSchema = object({});

export type CreateWallet = TypeOf<typeof walletValidationSchema>["body"];
export type getWalletBalance = TypeOf<typeof GetWalletBalanceSchema>["params"];
export type depositFunds = TypeOf<typeof DepositFundsSchema>["body"]
export type walletHistory = TypeOf<typeof WalletHistorySchema>["params"];
export type deleteWallet = TypeOf<typeof deleteWalletSchema>["params"];
export type getAllWallet = TypeOf<typeof getAllWalletSchema>;
export type getSingleWallet = TypeOf<typeof getWalletByIdSchema>["params"];
