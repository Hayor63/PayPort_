import {
  object,
  optional,
  string,
  number,
  array,
  TypeOf,
  boolean,
  z,
} from "zod";
export const CartitemSchema = object({
  body: object({
    productId: string({ required_error: "product is required" }),
    quantity: number({ required_error: " quantity is required" }).positive(),
  }),
});

export const updateCartItemSchema = object({
  params: object({
    id: string({
      required_error: "cart Id is required",
    }),
  }),

  body: object({
    productId: string({ required_error: "product is required" }),
    quantity: number({ required_error: " quantity is required" }).positive(),
    Subtotal: number().optional()
  }),
});

export const deleteCartItemSchema = object({
  params: object({
    id: string({
      required_error: "Billing ID is required",
    }),
  }),
});

// get Single Cart
export const getSingleCartItem = object({
  params: object({
    id: string({
      required_error: "Cart ID is required",
    }),
  }),
});


// Get All Cart Schema
export const getAllCartItemSchema = object({});


export type CreateCartitem = TypeOf<typeof CartitemSchema>["body"];
export type deleteCartItem = TypeOf<
  typeof deleteCartItemSchema
>["params"];
export type updateCartItem = {
  params: TypeOf<typeof updateCartItemSchema>["params"];
  body: TypeOf<typeof updateCartItemSchema>["body"];
};
export type getAllCartItem = TypeOf<typeof getAllCartItemSchema>
export type getSingleCartItemSchema = TypeOf<typeof getSingleCartItem>["params"];
